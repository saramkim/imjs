import { create } from 'zustand';

interface ConfigState {
  isLoaded: boolean;
  isPlaying: boolean;
  speed: number;
  setIsLoaded: (loaded: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  setSpeed: (ms: number) => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  isLoaded: false,
  isPlaying: false,
  speed: 500,

  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setSpeed: (ms) => set({ speed: ms }),
}));
