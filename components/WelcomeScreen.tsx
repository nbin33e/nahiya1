
import React from 'react';
import { speakText, playSFX, getAudioContext } from '../services/geminiService';

interface WelcomeScreenProps {
  onStart: (num: 1 | 2) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const handleStart = async (num: 1 | 2) => {
    // تفعيل سياق الصوت فوراً عند أول ضغطة لضمان عمل الـ TTS في المتصفحات
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') await ctx.resume();
    
    playSFX('click');
    await speakText("أهلاً يا أبطال! أنا صديقكم بطل السلامة، ومستعد لمغامرة جديدة معكم! هيا بنا نتعلم كيف نكون أقوياء ونحمي أنفسنا!");
    onStart(num);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-sky-400 to-blue-600 text-white relative overflow-hidden p-6 font-['Changa']">
      
      {/* عناصر خلفية متحركة */}
      <div className="absolute top-10 right-10 opacity-20 text-[120px] animate-float pointer-events-none select-none">🏠</div>
      <div className="absolute bottom-10 left-10 opacity-20 text-[120px] animate-float pointer-events-none select-none" style={{ animationDelay: '1s' }}>🚦</div>
      <div className="absolute top-1/2 left-20 opacity-10 text-[80px] animate-pulse pointer-events-none select-none">✨</div>

      <div className="z-10 flex flex-col items-center max-w-2xl w-full text-center">
        <div className="bg-white p-8 rounded-full border-[10px] border-yellow-400 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-float mb-10 relative">
          <span className="text-9xl md:text-[150px]">🛡️</span>
          <div className="absolute -bottom-4 -right-4 bg-green-500 text-white p-4 rounded-full border-4 border-white text-3xl shadow-lg">✨</div>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black mb-12 drop-shadow-[0_10px_0px_rgba(30,58,138,1)] tracking-tight">أبطال السلامة</h1>
        
        <p className="text-2xl md:text-3xl font-bold mb-10 opacity-90 leading-relaxed max-w-lg">
          استعد لمغامرة الذكاء والحرص في البيت والشارع!
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full px-4">
          <button 
            onClick={() => handleStart(1)}
            className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-black py-8 px-8 rounded-[40px] text-4xl cartoon-button flex items-center justify-center gap-6 group transition-all"
          >
            <span className="text-6xl group-hover:scale-125 transition-transform">👦</span>
            <span>لاعب واحد</span>
          </button>
          
          <button 
            onClick={() => handleStart(2)}
            className="flex-1 bg-green-400 hover:bg-green-300 text-blue-900 font-black py-8 px-8 rounded-[40px] text-4xl cartoon-button flex items-center justify-center gap-6 group transition-all"
          >
            <span className="text-6xl group-hover:scale-125 transition-transform">👦👧</span>
            <span>تحدي الأصدقاء</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-4 bg-yellow-400"></div>
    </div>
  );
};

export default WelcomeScreen;
