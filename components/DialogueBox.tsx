
import React, { useEffect, useState } from 'react';
import { DialogueLine } from '../types';
import { playSpeech, playFinishSound, playSax } from '../services/audioService';

interface DialogueBoxProps {
  line: DialogueLine;
  onFinishedTyping: () => void;
  isTyping: boolean;
  onClick: () => void;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ line, onFinishedTyping, isTyping, onClick }) => {
  const [displayedText, setDisplayedText] = useState('');

  // Determine if this is a sound effect line (specifically the Sax riff)
  const isSaxAction = line.text.includes('*Сакс') || line.text.includes('Сакс грає');

  useEffect(() => {
    // If not typing (e.g. skipped), show full text
    if (!isTyping) {
        setDisplayedText(line.text);
        return;
    }

    // If it's the sax line, trigger the sound immediately once
    if (isSaxAction) {
        playSax();
    }

    // Reset state for new line
    setDisplayedText('');
    
    let currentIndex = 0;
    const fullText = line.text;
    const isMale = line.speaker === 'Він';

    const interval = setInterval(() => {
      currentIndex++;
      const newText = fullText.slice(0, currentIndex);
      setDisplayedText(newText);
      
      // Play sound for every character to keep rhythm, UNLESS it is the sax action line
      // We don't want to beep over the music
      if (!isSaxAction) {
        // Skip spaces for cleaner rhythm
        const currentChar = fullText[currentIndex - 1];
        if (currentChar !== ' ') {
            playSpeech(isMale);
        }
      }

      if (currentIndex >= fullText.length) {
        clearInterval(interval);
        onFinishedTyping();
        playFinishSound();
      }
    }, 40); // Slightly slower for more dramatic effect with the new voices

    return () => clearInterval(interval);
  }, [line, isTyping, onFinishedTyping, isSaxAction]);

  // Determine avatar color based on speaker
  const avatarColor = line.speaker === 'Він' ? 'bg-teal-700' : 'bg-pink-700';

  return (
    <div 
      onClick={onClick}
      className="mt-4 w-full max-w-[420px] bg-slate-800 border-4 border-slate-600 hover:border-slate-500 active:border-slate-400 p-4 rounded-sm shadow-lg cursor-pointer relative select-none active:scale-[0.98] transition-all duration-75 group"
    >
      <div className="flex items-start gap-4">
        {/* Simple Pixel Avatar Box */}
        <div className={`w-12 h-12 shrink-0 ${avatarColor} border-2 border-white flex items-center justify-center transition-transform group-active:translate-y-0.5`}>
            <span className="text-xs text-white">{line.speaker === 'Він' ? 'M' : 'Ж'}</span>
        </div>
        
        <div className="flex-1">
          <div className="text-[10px] text-gray-400 mb-2 uppercase tracking-widest font-bold">
            {line.speaker}
          </div>
          <div className="text-xs leading-5 text-white font-['Press_Start_2P'] min-h-[60px]">
            {displayedText}
            {/* Blinking cursor - only show if typing isn't completely finished */}
            <span className={`ml-1 inline-block w-2 h-3 bg-white align-middle animate-pulse ${!isTyping && displayedText === line.text ? 'opacity-50' : ''}`}></span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-2 right-2 text-[8px] text-gray-500 animate-bounce">
        ТОРКНИСЬ
      </div>
    </div>
  );
};

export default DialogueBox;
