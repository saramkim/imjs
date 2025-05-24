import { create } from 'zustand';

interface ConfigState {
  isPlaying: boolean;
  autoPlay: boolean;
  speed: number;
  setIsPlaying: (playing: boolean) => void;
  setAutoPlay: (auto: boolean) => void;
  setSpeed: (ms: number) => void;
  reset: () => void;
}

export const configStore = create<ConfigState>((set) => ({
  isPlaying: false,
  autoPlay: false,
  speed: 1000,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setAutoPlay: (auto) => set({ autoPlay: auto }),
  setSpeed: (ms) => set({ speed: ms }),
  reset: () => set({ isPlaying: false, autoPlay: false, speed: 1000 }),
}));
