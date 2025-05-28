import { create } from 'zustand';
import { ExecutionContext, ExecutionContextState } from '@core/simulator/execution-context';

export interface ExecutionState extends ExecutionContextState {
  updateFromContext: (ctx: ExecutionContext) => void;
  reset: () => void;
}

export const useExecutionStore = create<ExecutionState>((set) => ({
  ...new ExecutionContextState(),

  updateFromContext: (ctx: ExecutionContext) => {
    set({
      callStack: [...ctx.callStack],
      webApi: [...ctx.webApi],
      taskQueue: [...ctx.taskQueue],
      consoleOutput: [...ctx.consoleOutput],
    });
  },
  reset: () => {
    set(new ExecutionContextState());
  },
}));
