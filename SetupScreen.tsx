
import React, { useState } from 'react';
import { CHARACTERS } from '../constants';
import { Player } from '../types';

interface SetupScreenProps {
  numPlayers: 1 | 2;
  onComplete: (players: Player[]) => void;
  onBack: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ numPlayers, onComplete, onBack }) => {
  const [step, setStep] = useState(0);
  const [players, setPlayers] = useState<Partial<Player>[]>(
    Array.from({ length: numPlayers }, () => ({ name: '', score: 0 }))
  );

  const handleNext = () => {
    if (step < numPlayers - 1) {
      setStep(step + 1);
    } else {
      onComplete(players as Player[]);
    }
  };

  const updatePlayer = (field: keyof Player, value: any) => {
    const newPlayers = [...players];
    newPlayers[step] = { ...newPlayers[step], [field]: value };
    setPlayers(newPlayers);
  };

  const currentPlayer = players[step];
  const isReady = (currentPlayer?.name?.trim()?.length || 0) >= 2 && currentPlayer?.character;

  return (
    <div className="h-full flex-1 flex flex-col items-center bg-white overflow-hidden">
      {/* Header - Fixed Height */}
      <div className="w-full bg-blue-600 p-4 md:p-6 flex justify-between items-center border-b-8 border-blue-800 shrink-0">
        <button 
          onClick={onBack} 
          className="bg-white text-blue-600 px-4 py-2 rounded-xl border-4 border-blue-400 font-black hover:scale-105 transition-transform text-xl shadow-md"
        >
          ⬅️ رجوع
        </button>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white bg-blue-700 px-6 py-2 rounded-full border-2 border-blue-400">
             {numPlayers > 1 ? `البطل ${step + 1}` : 'تجهيز البطل'}
          </h2>
        </div>
        <div className="w-20 hidden md:block"></div>
      </div>

      <div className="flex-1 w-full max-w-4xl p-6 flex flex-col justify-center gap-8 overflow-y-auto min-h-0">
        {/* Name Input Section */}
        <div className="w-full text-center shrink-0">
          <label className="block text-blue-900 text-2xl font-black mb-3">ما هو اسمك يا بطل؟</label>
          <input 
            type="text"
            placeholder="اكتب اسمك هنا..."
            className="w-full max-w-md mx-auto px-6 py-4 rounded-[25px] border-4 border-blue-200 text-3xl font-black focus:border-yellow-400 focus:ring-8 focus:ring-yellow-100 outline-none text-center shadow-md bg-white text-blue-900 placeholder:text-blue-100 transition-all"
            value={currentPlayer?.name || ''}
            onChange={(e) => updatePlayer('name', e.target.value)}
            maxLength={12}
          />
        </div>

        {/* Character Selection Section */}
        <div className="w-full">
          <p className="text-2xl font-black text-blue-900 mb-6 text-center">اختر الشخصية التي تفضلها:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {CHARACTERS.map((char) => (
              <button
                key={char.id}
                onClick={() => updatePlayer('character', char)}
                className={`group relative p-4 rounded-[40px] border-4 transition-all flex flex-col items-center gap-3 ${
                  currentPlayer?.character?.id === char.id 
                    ? 'border-yellow-400 bg-yellow-50 scale-105 shadow-xl ring-4 ring-yellow-200' 
                    : 'border-blue-50 bg-white hover:bg-blue-50 hover:border-blue-100 shadow-sm'
                }`}
              >
                {currentPlayer?.character?.id === char.id && (
                  <div className="absolute -top-3 -right-2 bg-yellow-400 text-white p-2 rounded-full shadow-lg border-2 border-white animate-bounce z-10">
                    ⭐
                  </div>
                )}
                <div className={`p-2 rounded-full ${char.color} border-4 border-white shadow-md transition-transform group-hover:rotate-3`}>
                  <img src={char.image} alt={char.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20" />
                </div>
                <span className={`font-black text-lg ${currentPlayer?.character?.id === char.id ? 'text-blue-900' : 'text-blue-300'}`}>
                  {char.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Action Button - Fixed Height */}
      <div className="w-full p-6 bg-blue-50 border-t-4 border-blue-100 flex justify-center shrink-0">
        <button 
          disabled={!isReady}
          onClick={handleNext}
          className={`w-full max-w-sm py-5 rounded-[30px] text-3xl font-black cartoon-button transition-all ${
            isReady 
              ? 'bg-yellow-400 text-blue-900 shadow-[0_8px_0_#1e3a8a] hover:brightness-110 active:translate-y-1 active:shadow-[0_4px_0_#1e3a8a]' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50 shadow-none translate-y-0'
          }`}
        >
          {step < numPlayers - 1 ? 'البطل التالي ✨' : 'انطلق للمغامرة! 🚀'}
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;
