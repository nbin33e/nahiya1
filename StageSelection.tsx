
import React from 'react';
import { GameStage } from '../types';

interface StageSelectionProps {
  onSelect: (stage: GameStage) => void;
  onBack: () => void;
}

const StageSelection: React.FC<StageSelectionProps> = ({ onSelect, onBack }) => {
  return (
    <div className="h-full flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -top-20 -left-20 text-[200px] opacity-5 select-none pointer-events-none rotate-12">🏘️</div>
      <div className="absolute -bottom-20 -right-20 text-[200px] opacity-5 select-none pointer-events-none -rotate-12">🚦</div>

      <div className="absolute top-6 right-6">
        <button 
          onClick={onBack} 
          className="text-4xl hover:scale-110 active:scale-95 transition-transform p-4 bg-white rounded-3xl shadow-xl border-4 border-blue-50"
        >
          🏠
        </button>
      </div>
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-blue-900 mb-4 drop-shadow-sm">اختر مغامرتك!</h2>
        <div className="w-48 h-3 bg-yellow-400 mx-auto rounded-full shadow-sm"></div>
        <p className="mt-6 text-xl md:text-2xl text-blue-400 font-bold">أين تريد أن تبدأ اليوم يا بطل؟</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl relative z-10">
        <button 
          onClick={() => onSelect(GameStage.HOME)}
          className="group relative bg-white p-10 rounded-[50px] border-4 border-blue-50 shadow-2xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-3 flex flex-col items-center"
        >
          <div className="text-[140px] mb-6 group-hover:scale-110 transition-transform drop-shadow-2xl">🏠</div>
          <h3 className="text-4xl font-black text-orange-600 mb-4">أمان المنزل</h3>
          <p className="text-gray-400 font-bold text-center text-lg leading-relaxed">كن ذكياً في بيتك <br/> وتعلم قواعد السلامة!</p>
          <div className="mt-10 bg-orange-500 text-white font-black py-4 px-12 rounded-3xl text-2xl group-hover:bg-orange-600 shadow-lg border-b-4 border-orange-700 active:border-b-0 transition-all">
            انطلق الآن! 🚀
          </div>
        </button>

        <button 
          onClick={() => onSelect(GameStage.STREET)}
          className="group relative bg-white p-10 rounded-[50px] border-4 border-blue-50 shadow-2xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] transition-all hover:-translate-y-3 flex flex-col items-center"
        >
          <div className="text-[140px] mb-6 group-hover:scale-110 transition-transform drop-shadow-2xl">🚦</div>
          <h3 className="text-4xl font-black text-green-600 mb-4">أمان الشارع</h3>
          <p className="text-gray-400 font-bold text-center text-lg leading-relaxed">تعرف على قوانين الطريق <br/> لتكون بطلاً حذراً!</p>
          <div className="mt-10 bg-green-500 text-white font-black py-4 px-12 rounded-3xl text-2xl group-hover:bg-green-600 shadow-lg border-b-4 border-green-700 active:border-b-0 transition-all">
            ابدأ التحدي! 🚦
          </div>
        </button>
      </div>
    </div>
  );
};

export default StageSelection;
