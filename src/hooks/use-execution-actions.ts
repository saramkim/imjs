import { executionEngine } from '@core/execution-engine';

export const useExecutionActions = () => {
  return {
    play: () => executionEngine.play(),
    pause: () => executionEngine.pause(),
    step: () => executionEngine.step(),
    reset: () => executionEngine.reset(),
    load: (code: string) => executionEngine.load(code),
    setSpeed: (ms: number) => executionEngine.setSpeed(ms),
  };
};
