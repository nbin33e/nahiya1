
import { GoogleGenAI, Modality } from "@google/genai";

const getAPIKey = () => {
  return (window as any).process?.env?.API_KEY || (process?.env?.API_KEY);
};

let sharedAudioContext: AudioContext | null = null;

export const getAudioContext = () => {
  if (!sharedAudioContext) {
    sharedAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  return sharedAudioContext;
};

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const playSFX = (type: 'success' | 'error' | 'click') => {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const now = ctx.currentTime;
    
    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {}
};

const speakNativeFallback = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    // البحث عن صوت ذكر عربي
    const maleVoice = voices.find(v => 
      v.lang.startsWith('ar') && 
      (v.name.toLowerCase().includes('male') || 
       v.name.toLowerCase().includes('naif') || 
       v.name.toLowerCase().includes('hamdan'))
    );
    
    if (maleVoice) {
      utterance.voice = maleVoice;
    }

    utterance.lang = 'ar-SA';
    utterance.rate = 1.0; 
    utterance.pitch = 1.5; // طبقة صوت أعلى لتبدو كطفل
    window.speechSynthesis.speak(utterance);
    return new Promise((resolve) => {
      utterance.onend = () => resolve(true);
      setTimeout(() => resolve(true), 12000); 
    });
  }
  return Promise.resolve(true);
};

export const speakText = async (text: string) => {
  const apiKey = getAPIKey();
  
  const systemInstruction = `
    أنت الآن "بطل السلامة الصغير"، صديق الأطفال الشجاع والمرح.
    يجب أن تتحدث حصراً باللغة العربية الفصحى (Modern Standard Arabic) وبدون أي لهجة عامية.
    تحدث بصوت طفل ذكر كرتوني، نشيط جداً، مليء بالحماس والقوة.
    اجعل نبرة صوتك مثل أبطال مسلسلات الكرتون الشجعان.
    خاطب الأطفال كأبطال مثلك، استخدم نبرة مبهجة وواثقة.
    تجنب النبرة النسائية أو نبرة الكبار، تقمص شخصية طفل ذكر في العاشرة من عمره.
    استخدم عبارات فصحى مثل: "يا أبطال السلامة"، "هيا بنا لننطلق"، "أحسنتم صنعاً".
    النص المطلوب نطقُه هو: "${text}"
    تنبيه: لا تذكر اسمك، ولا تخرج عن اللغة العربية الفصحى أبداً.
  `;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: systemInstruction }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // Puck هو الخيار الأنسب للأصوات الذكورية الحيوية في Gemini
            prebuiltVoiceConfig: { voiceName: 'Puck' }, 
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const audioContext = getAudioContext();
      if (audioContext.state === 'suspended') await audioContext.resume();
      
      const audioBuffer = await decodeAudioData(decode(base64Audio), audioContext, 24000, 1);
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();
      return new Promise((resolve) => {
        source.onended = () => resolve(true);
      });
    } else {
      return await speakNativeFallback(text);
    }
  } catch (error: any) {
    console.warn("TTS API Error, using native fallback.");
    return await speakNativeFallback(text);
  }
};
