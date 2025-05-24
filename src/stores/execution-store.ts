import { create } from 'zustand';
import { ExecutionContext, type Task, type WebApiTask } from '../core/simulator/execution-context';

export interface ExecutionState {
  callStack: string[];
  webApi: WebApiTask[];
  taskQueue: Task[];
  consoleOutput: string[];
  updateFromContext: (ctx: ExecutionContext) => void;
  reset: () => void;
}

export const useExecutionStore = create<ExecutionState>((set) => ({
  callStack: [],
  webApi: [],
  taskQueue: [],
  consoleOutput: [],
  updateFromContext: (ctx: ExecutionContext) => {
    set({
      callStack: [...ctx.callStack],
      webApi: [...ctx.webApi],
      taskQueue: [...ctx.taskQueue],
      consoleOutput: [...ctx.consoleOutput],
    });
  },
  reset: () => {
    set({
      callStack: [],
      webApi: [],
      taskQueue: [],
      consoleOutput: [],
    });
  },
}));
