
import React, { useState, useEffect, useRef } from 'react';
import { GameState, GameStage, Player } from '../types';
import { QUESTIONS } from '../constants';
import { speakText, playSFX, getAudioContext } from '../services/geminiService';
import { generateSafetyImage } from '../services/imageService';

interface GameScreenProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onWin: (winner: Player) => void;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ gameState, setGameState, onWin, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const stage = gameState.activeStage || GameStage.HOME;
  
  // صور كرتونية ابتدائية سريعة التحميل تظهر فوراً
  const cartoonFallbacks: Record<string, string> = {
    'HOME': 'https://illustrations.popsy.co/amber/stay-at-home.svg',
    'STREET': 'https://illustrations.popsy.co/amber/shipped.svg'
  };
  
  const [displayImageUrl, setDisplayImageUrl] = useState<string>(cartoonFallbacks[stage]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  
  const stageQuestions = QUESTIONS[stage];
  const question = stageQuestions[currentQuestionIndex];
  const hasSpokenRef = useRef<number | null>(null);

  useEffect(() => {
    // تعيين الصورة الكرتونية البديلة فوراً عند كل سؤال جديد لضمان السرعة
    setDisplayImageUrl(cartoonFallbacks[stage]);

    const loadQuestionContent = async () => {
      // التأكد من أن سياق الصوت مفعل
      getAudioContext().resume().catch(() => {});
      
      // جلب صورة الذكاء الاصطناعي في الخلفية (كرتونية فقط)
      setIsGeneratingImage(true);
      generateSafetyImage(question.imagePrompt, stage).then(imageUrl => {
        if (imageUrl) {
          setDisplayImageUrl(imageUrl);
        }
        setIsGeneratingImage(false);
      });
      
      // قراءة السؤال فقط فوراً وبدون أي مقدمات لضمان السرعة
      if (hasSpokenRef.current !== currentQuestionIndex) {
        hasSpokenRef.current = currentQuestionIndex;
        setIsSpeaking(true);
        await speakText(question.text);
        setIsSpeaking(false);
      }
    };
    
    loadQuestionContent();
  }, [currentQuestionIndex, question.text, stage]);

  const handleAnswer = async (index: number) => {
    if (feedback || isSpeaking) return;

    const correct = index === question.correctIndex;
    setIsCorrect(correct);
    playSFX(correct ? 'success' : 'error');
    
    const msg = correct 
      ? `رائع! ${question.feedback}` 
      : `للأسف يا بطل، انتبه أكثر في المرة القادمة! الإجابة الصحيحة كانت: ${question.options[question.correctIndex]}`;
    
    setFeedback(msg);
    
    setIsSpeaking(true);
    await speakText(msg);
    setIsSpeaking(false);

    // الانتظار قليلاً ثم الانتقال للسؤال التالي دائماً
    setTimeout(() => {
      if (correct) {
        // تحديث النقاط للاعب الحالي في حال الإجابة الصحيحة فقط
        const updatedPlayers = [...gameState.players];
        updatedPlayers[gameState.currentPlayerIndex].score += 1;
        
        const winner = updatedPlayers.find(p => p.score >= 10);
        
        if (winner) {
          onWin(winner);
          return;
        }

        setGameState(prev => ({
          ...prev,
          players: updatedPlayers,
          currentPlayerIndex: prev.numPlayers === 2 ? (prev.currentPlayerIndex + 1) % 2 : 0
        }));
      } else {
        // في حال الإجابة الخاطئة، لا نزيد النقاط ونغير الدور إذا كان هناك لاعبان
        if (gameState.numPlayers === 2) {
          setGameState(prev => ({
            ...prev,
            currentPlayerIndex: (prev.currentPlayerIndex + 1) % 2
          }));
        }
      }
      
      // في كلتا الحالتين (صح أو خطأ)، ننتقل للسؤال التالي
      nextQuestion();
    }, 2500); 
  };

  const nextQuestion = () => {
    setFeedback(null);
    setIsCorrect(null);
    // العودة لأول سؤال إذا انتهت الأسئلة
    setCurrentQuestionIndex((prev) => (prev + 1) % stageQuestions.length);
  };

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  return (
    <div className="h-full flex flex-col bg-sky-50 overflow-hidden font-['Changa']">
      {/* شريط المعلومات العلوي */}
      <div className="bg-white px-6 py-4 flex justify-between items-center border-b-4 border-blue-100 shrink-0 shadow-sm z-30">
        <button 
          onClick={() => { playSFX('click'); onBack(); }} 
          className="bg-red-50 text-red-600 px-5 py-2 rounded-2xl border-2 border-red-100 font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm"
        >
          🏠 خروج
        </button>
        
        <div className="flex gap-3">
          {gameState.players.map((p, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 px-5 py-2 rounded-2xl border-2 transition-all ${
                gameState.currentPlayerIndex === i 
                ? 'bg-blue-600 border-blue-400 scale-105 shadow-lg text-white' 
                : 'bg-white border-gray-100 opacity-60 text-gray-400'
              }`}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-white/50">
                <img src={p.character.image} className="w-full h-full" alt="" />
              </div>
              <div className="text-right">
                <p className="text-xs font-bold leading-none mb-1 opacity-80">{p.name}</p>
                <p className="text-xl font-black leading-none">⭐ {p.score}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* منطقة السؤال والصورة */}
      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden gap-6">
        <div className="bg-white rounded-[40px] border-4 border-blue-100 shadow-xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 min-h-0 flex-1">
          <div className="w-full md:w-1/2 aspect-video bg-blue-50 rounded-[30px] overflow-hidden border-4 border-blue-50 relative shadow-inner">
            <img 
              src={displayImageUrl} 
              alt="Scenario" 
              className="w-full h-full object-contain transition-all duration-300"
            />
            
            {isSpeaking && (
              <div className="absolute top-4 left-4 bg-yellow-400 text-blue-900 px-5 py-2 rounded-full border-4 border-white shadow-2xl flex items-center gap-3 animate-bounce z-20">
                <span className="text-2xl">📢</span>
                <span className="font-black text-sm">استمع للسؤال...</span>
              </div>
            )}
            
            {isGeneratingImage && (
              <div className="absolute bottom-4 right-4 bg-blue-600/90 text-white px-3 py-1 rounded-full text-[10px] font-bold border border-white animate-pulse">
                تجهيز الرسم الكرتوني...
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 text-center md:text-right">
             <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
               سؤال رقم {currentQuestionIndex + 1}
             </div>
             <h2 className="text-3xl md:text-5xl font-black text-blue-900 leading-[1.3] mb-4">
               {question.text}
             </h2>
          </div>
        </div>

        {/* منطقة الإجابات أو التغذية الراجعة */}
        <div className="h-48 md:h-56 shrink-0">
          {feedback ? (
            <div className={`h-full w-full flex flex-col items-center justify-center rounded-[40px] text-center p-6 border-4 shadow-2xl animate-in zoom-in duration-300 ${
              isCorrect 
              ? 'bg-green-500 border-green-300 text-white' 
              : 'bg-orange-500 border-orange-300 text-white'
            }`}>
              <div className="text-5xl mb-2">{isCorrect ? '🌟 ممتاز!' : '💪 انتبه أكثر'}</div>
              <p className="text-xl md:text-2xl font-bold max-w-2xl">{feedback}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-full">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  disabled={isSpeaking}
                  onClick={() => handleAnswer(i)}
                  className="bg-white hover:bg-yellow-400 hover:text-blue-900 text-blue-900 text-xl md:text-2xl font-black p-4 md:p-6 rounded-[30px] cartoon-button transition-all disabled:opacity-80 border-gray-100 shadow-lg flex items-center justify-center text-center leading-tight"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* شريط الدور الحالي في الأسفل */}
      <div className="py-4 px-8 bg-blue-600 text-white flex justify-center items-center gap-4 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <span className="text-xl font-bold opacity-80 italic">دور البطل الآن:</span>
        <div className="bg-yellow-400 px-10 py-2 rounded-full border-2 border-white text-blue-900 font-black text-2xl md:text-3xl shadow-lg transform -rotate-1">
          {currentPlayer.name} 🦸‍♂️
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
