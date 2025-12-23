export type SceneType = 'splash' | 'night' | 'final';

export interface DialogueLine {
  speaker: string;
  text: string;
  emote?: 'neutral' | 'smile' | 'confused' | 'laugh';
}

export interface PropData {
  id: string;
  type: 'bed' | 'sax' | 'panda' | 'clock' | 'mug' | 'lamp' | 'cake' | 'blanket_overlay' | 'panda_xmas';
  x: number;
  y: number;
  layer: 'back' | 'front'; // Behind or in front of characters
}

export interface CharacterData {
  id: 'guy' | 'girl';
  x: number;
  y: number;
  pose: 'idle' | 'sitting' | 'under_blanket';
}

export interface SceneData {
  id: string;
  title?: string;
  type: SceneType;
  nightNumber?: number;
  characters: CharacterData[];
  props: PropData[];
  overlay?: 'kitchen' | 'rain' | 'confetti';
  dialogue: DialogueLine[];
}

export interface GameState {
  currentSceneIndex: number;
  currentDialogueIndex: number;
  isTyping: boolean;
  isMuted: boolean;
}