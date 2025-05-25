import { create } from 'zustand';

interface ConfigState {
  isLoaded: boolean;
  isPlaying: boolean;
  autoPlay: boolean;
  speed: number;
  setIsLoaded: (loaded: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  setAutoPlay: (auto: boolean) => void;
  setSpeed: (ms: number) => void;
  reset: () => void;
}

export const useConfigStore = create<ConfigState>((set) => ({
  isLoaded: false,
  isPlaying: false,
  autoPlay: false,
  speed: 1000,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setAutoPlay: (auto) => set({ autoPlay: auto }),
  setSpeed: (ms) => set({ speed: ms }),
  reset: () => set({ isPlaying: false, autoPlay: false, speed: 1000, isLoaded: false }),
}));
