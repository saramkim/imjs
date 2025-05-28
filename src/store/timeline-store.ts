import { create } from 'zustand';
import type { Command } from '@core/command/command';

interface TimelineState {
  commands: Command[];
  currentIndex: number;
  isCompleted: boolean;
  setCommands: (cmds: Command[]) => void;
  setCurrentIndex: (index: number) => void;
  reset: () => void;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  commands: [],
  currentIndex: 0,
  isCompleted: false,

  setCommands: (commands) =>
    set({
      commands,
      currentIndex: 0,
      isCompleted: commands.length === 0,
    }),
  setCurrentIndex: (index) =>
    set({
      currentIndex: index,
      isCompleted: index >= get().commands.length,
    }),
  reset: () => set({ currentIndex: 0, isCompleted: false }),
}));
