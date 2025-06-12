import { create } from 'zustand';

interface TimelineState {
  totalSteps: number;
  currentStepIndex: number;
  isCompleted: boolean;
  setTotalSteps: (steps: number) => void;
  setCurrentIndex: (index: number) => void;
  reset: () => void;
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  totalSteps: 0,
  currentStepIndex: 0,
  isCompleted: false,

  setTotalSteps: (steps) =>
    set({
      totalSteps: steps,
      currentStepIndex: 0,
      isCompleted: steps === 0,
    }),
  setCurrentIndex: (index) =>
    set({
      currentStepIndex: index,
      isCompleted: index >= get().totalSteps,
    }),
  reset: () =>
    set({
      currentStepIndex: 0,
      isCompleted: false,
    }),
}));
