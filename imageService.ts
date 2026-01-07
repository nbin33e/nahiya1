
import { GoogleGenAI } from "@google/genai";

const getAPIKey = () => {
  return (window as any).process?.env?.API_KEY || (process?.env?.API_KEY);
};

export const generateSafetyImage = async (prompt: string, stage: string): Promise<string | null> => {
  const apiKey = getAPIKey();
  
  // صور بديلة كرتونية عامة في حال فشل الذكاء الاصطناعي
  const fallbackImages: Record<string, string> = {
    'HOME': 'https://illustrations.popsy.co/amber/stay-at-home.svg',
    'STREET': 'https://illustrations.popsy.co/amber/shipped.svg'
  };
  const fallbackUrl = fallbackImages[stage] || fallbackImages['HOME'];

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-quality 3D Pixar-style cartoon illustration for kids. 
            Bright friendly colors, clear characters, child-safe educational scene. 
            Scene to draw: ${prompt}. 
            Important: No real-life photos, no text, no scary elements, pure 3D animated movie style.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        },
      },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (imagePart?.inlineData) {
      return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`;
    }
    
    return fallbackUrl;
  } catch (error: any) {
    console.warn("Image Generation Error:", error);
    // العودة لصورة كرتونية بديلة فوراً
    return fallbackUrl;
  }
};
