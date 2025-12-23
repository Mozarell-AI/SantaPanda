
let audioCtx: AudioContext | null = null;

export const initAudio = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch((err) => console.warn('Audio resume failed', err));
  }
};

export const playSpeech = (isMale: boolean) => {
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Pitch settings
    // Male: Lower, roughly A2 (110Hz) variation
    // Female: Higher, roughly E4 (330Hz) variation
    const baseFreq = isMale ? 110 : 330; 
    const randomVar = Math.random() * 30; 
    
    osc.frequency.setValueAtTime(baseFreq + randomVar, audioCtx.currentTime);

    // Tone type
    // Male: Sawtooth/Square for a bit of "buzz"
    // Female: Sine/Triangle for a softer, clearer tone
    osc.type = isMale ? 'square' : 'triangle';

    // Volume (Gain) - Increased as requested
    // Male voices usually need slightly less gain to not overpower due to square wave harmonics
    const volume = isMale ? 0.08 : 0.12; 

    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  } catch (e) {
    // Ignore audio errors
  }
};

export const playSax = () => {
  if (!audioCtx) return;

  try {
    const now = audioCtx.currentTime;
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.2, now); // Louder for the music
    masterGain.connect(audioCtx.destination);

    // Simple Jazz Lick (Major 7th arpeggio-ish)
    const notes = [261.63, 329.63, 392.00, 493.88]; // C4, E4, G4, B4
    const duration = 0.15;

    notes.forEach((freq, i) => {
      const osc = audioCtx!.createOscillator();
      const noteGain = audioCtx!.createGain();

      osc.type = 'sawtooth'; // Brassy sound
      osc.frequency.value = freq;

      // Filter to smooth out the sawtooth (Lowpass)
      const filter = audioCtx!.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      
      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(masterGain);

      const startTime = now + i * 0.12; // Stagger notes
      
      // Envelope
      noteGain.gain.setValueAtTime(0, startTime);
      noteGain.gain.linearRampToValueAtTime(1, startTime + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.01, startTime + duration + 0.1);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.2);
    });

  } catch (e) {
    console.error(e);
  }
};

export const playSaxLoop = () => {
  if (!audioCtx) return;
  
  // A longer, ambient loop for the ending
  try {
    const now = audioCtx.currentTime;
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.15, now);
    masterGain.connect(audioCtx.destination);
    
    // A simple chord progression: Cmaj7 -> Dm7 -> G7 -> Cmaj7
    const chords = [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [293.66, 349.23, 440.00, 523.25], // Dm7
        [392.00, 493.88, 587.33, 698.46], // G7
        [261.63, 329.63, 392.00, 493.88]  // Cmaj7
    ];

    chords.forEach((chord, chordIndex) => {
        const chordStart = now + chordIndex * 1.5; // slow changes
        
        chord.forEach((freq, noteIndex) => {
            const osc = audioCtx!.createOscillator();
            const noteGain = audioCtx!.createGain();
            
            osc.type = 'sine'; // Softer, dreamier
            osc.frequency.value = freq;
            
            osc.connect(noteGain);
            noteGain.connect(masterGain);
            
            // Gentle attack and release
            noteGain.gain.setValueAtTime(0, chordStart);
            noteGain.gain.linearRampToValueAtTime(0.3, chordStart + 0.5); // Fade in
            noteGain.gain.linearRampToValueAtTime(0, chordStart + 2.0); // Fade out

            osc.start(chordStart);
            osc.stop(chordStart + 2.5);
        });
    });

  } catch (e) {
      console.error(e);
  }
};

export const playFinishSound = () => {
  if (!audioCtx) return;

  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // A small "ding" or "chirp" to signal completion
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
    osc.type = 'sine';

    // Increased volume
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  } catch (e) {
    // Ignore audio errors
  }
};
