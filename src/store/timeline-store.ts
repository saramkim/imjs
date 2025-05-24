import { create } from 'zustand';
import type { Command } from '@core/command/command';

interface TimelineState {
  commands: Command[];
  currentIndex: number;
  totalCommands: number;
  setCommands: (cmds: Command[]) => void;
  setCurrentIndex: (index: number) => void;
  reset: () => void;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  commands: [],
  currentIndex: 0,
  totalCommands: 0,
  setCommands: (cmds) =>
    set({
      commands: cmds,
      totalCommands: cmds.length,
      currentIndex: 0,
    }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  reset: () => set({ commands: [], currentIndex: 0, totalCommands: 0 }),
}));
