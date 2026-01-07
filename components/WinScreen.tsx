
import React, { useEffect } from 'react';
import { Player } from '../types';
import { speakText } from '../services/geminiService';

interface WinScreenProps {
  winner: Player | null;
  onRestart: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ winner, onRestart }) => {
  useEffect(() => {
    if (winner) {
      speakText(`أحسنت يا ${winner.name}! أنت بطل السلامة الحقيقي!`);
    }
  }, [winner]);

  if (!winner) return null;

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-yellow-400 to-orange-500 p-8 text-white text-center">
      <div className="animate-float mb-8 relative">
        <span className="text-9xl">🥇</span>
        <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 text-4xl shadow-lg">🏆</div>
      </div>
      
      <h1 className="text-6xl font-black mb-4 drop-shadow-md">مبارك الفوز!</h1>
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-3xl mb-12 shadow-inner inline-block">
        <img src={winner.character.image} className="w-48 h-48 rounded-full border-8 border-white shadow-2xl mx-auto mb-4" alt={winner.name} />
        <h2 className="text-4xl font-black text-white">{winner.name}</h2>
        <p className="text-2xl font-bold mt-2">لقد حصلت على {winner.score} نجوم! ⭐</p>
      </div>

      <p className="text-2xl font-bold mb-8 animate-pulse text-yellow-100">"أحسنت! أنت بطل السلامة 👏"</p>

      <div className="flex gap-4">
        <button 
          onClick={onRestart}
          className="bg-white text-orange-600 px-12 py-4 rounded-2xl text-2xl font-black cartoon-button"
        >
          🔄 العودة للرئيسية
        </button>
      </div>
      
      {/* Confetti simulation with emojis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 2 + 1}rem`
            }}
          >
            ⭐
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinScreen;
