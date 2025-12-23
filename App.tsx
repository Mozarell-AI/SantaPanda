
import React, { useState, useEffect, useCallback } from 'react';
import GameCanvas from './components/GameCanvas';
import DialogueBox from './components/DialogueBox';
import { SCENES } from './constants';
import { SceneData } from './types';
import { initAudio, playSaxLoop } from './services/audioService';

const App: React.FC = () => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFinalCard, setShowFinalCard] = useState(false);

  // When showing final card, we want the "final" scene visual (last index) to be visible in background
  const activeSceneIndex = showFinalCard ? SCENES.length - 1 : sceneIndex;
  const currentScene: SceneData = SCENES[activeSceneIndex];
  const currentLine = !showFinalCard ? currentScene.dialogue[dialogueIndex] : null;

  // Transition helper
  const switchScene = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSceneIndex(newIndex);
      setDialogueIndex(0);
      setIsTransitioning(false);
      // If next scene has dialogue, start typing
      if (SCENES[newIndex].dialogue.length > 0) {
        setIsTyping(true);
      }
    }, 600); // Wait for fade out
  };

  const handleInteraction = useCallback(() => {
    // Initialize audio on first interaction
    initAudio();

    if (showFinalCard) {
        // Restart
        setShowFinalCard(false);
        switchScene(0);
        return;
    }

    // SPLASH SCREEN
    if (currentScene.type === 'splash') {
      switchScene(1);
      return;
    }

    // GAMEPLAY
    if (currentScene.type === 'night') {
      if (isTyping) {
        // Skip typing
        setIsTyping(false);
      } else {
        // Go to next line
        if (dialogueIndex < currentScene.dialogue.length - 1) {
          setDialogueIndex((prev) => prev + 1);
          setIsTyping(true);
        } else {
          // Scene finished, go next
          if (sceneIndex < SCENES.length - 2) { // Stop before 'final' index
             switchScene(sceneIndex + 1);
          } else {
             // We are at Night 9 (index length - 2), next is Final
             setShowFinalCard(true);
             playSaxLoop();
          }
        }
      }
    }
  }, [currentScene, dialogueIndex, isTyping, sceneIndex, showFinalCard]);

  // Initial typing trigger for night 1
  useEffect(() => {
      if (currentScene.type === 'night' && dialogueIndex === 0 && !isTyping && !showFinalCard) {
          setIsTyping(true);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIndex]);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* CRT Overlay Effect */}
      <div className="absolute inset-0 scanlines z-50 pointer-events-none opacity-20"></div>

      <div className="w-full max-w-[420px] mx-auto z-10 flex flex-col items-center">
        
        {/* Header / Nav */}
        <div className="w-full flex justify-between items-center mb-4 px-2">
            <h1 className="text-xs text-gray-400">
                {currentScene.title || 'PIXEL PANDA'}
            </h1>
            <div className="flex gap-2">
                {/* Visual Mute Button (Simulated) */}
                <button className="text-[10px] text-gray-500 hover:text-white uppercase">
                    ♫
                </button>
            </div>
        </div>

        {/* The "Stage" */}
        <div onClick={handleInteraction} className="w-full relative">
            <GameCanvas scene={currentScene} isTransitioning={isTransitioning} />
            
            {/* Start Button Overlay for Splash */}
            {currentScene.type === 'splash' && (
                <div className="absolute bottom-16 w-full text-center animate-bounce">
                    <span className="text-xs bg-black px-4 py-2 border border-white">Натисни щоб почати</span>
                </div>
            )}

            {/* Final Card Overlay */}
            {showFinalCard && (
             <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-fade-in border-4 border-slate-600 rounded-sm">
                <div className="text-4xl mb-6">🎄🐼</div>
                <h2 className="text-sm font-bold mb-4 text-pink-400 leading-6">З Різдвом та Новим роком, Іра!</h2>
                <p className="text-[10px] text-gray-200 mb-8 leading-5 drop-shadow-md">
                    Нехай кожна ніч буде трішки добрішою, ніж учора.<br/><br/>
                    Дякую за твою гру, твою присутність і твоє світло на сцені.
                </p>
                <button 
                    className="px-6 py-3 bg-pink-700 text-white text-[10px] uppercase hover:bg-pink-600 active:translate-y-1 transition-all border border-white"
                >
                    Дивитись знову
                </button>
             </div>
            )}
        </div>

        {/* Dialogue Box */}
        {currentScene.type === 'night' && currentLine && !showFinalCard && (
            <DialogueBox 
                key={`${sceneIndex}-${dialogueIndex}`}
                line={currentLine} 
                isTyping={isTyping} 
                onFinishedTyping={() => setIsTyping(false)}
                onClick={handleInteraction}
            />
        )}
        
        {/* Footer info */}
        <div className="mt-8 text-[8px] text-gray-700">
            Tap to advance • Mobile First
        </div>

      </div>
    </div>
  );
};

export default App;
