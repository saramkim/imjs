import { Interpreter } from '@core/interpreter/interpreter';
import { Simulator } from '@core/simulator/simulator';
import { useExecutionStore } from '@store/execution-store';
import { useTimelineStore } from '@store/timeline-store';
import { useConfigStore } from '@store/config-store';

class ExecutionEngine {
  private interpreter = new Interpreter();
  private simulator = new Simulator();

  constructor() {
    this.simulator.subscribe('load', (totalSteps) => {
      useTimelineStore.getState().setTotalSteps(totalSteps);
    });

    this.simulator.subscribe('step', (ctx) => {
      useExecutionStore.getState().updateFromContext(ctx);
      useTimelineStore.getState().setCurrentIndex(this.simulator.getCurrentIndex());
    });

    this.simulator.subscribe('play', () => {
      useConfigStore.getState().setIsPlaying(true);
    });

    this.simulator.subscribe('pause', () => {
      useConfigStore.getState().setIsPlaying(false);
    });

    this.simulator.subscribe('reset', () => {
      useExecutionStore.getState().reset();
      useTimelineStore.getState().reset();
      useConfigStore.getState().setIsPlaying(false);
    });

    this.simulator.subscribe('setSpeed', (ms) => {
      useConfigStore.getState().setSpeed(ms);
    });
  }

  load(code: string) {
    const commands = this.interpreter.interpret(code);
    this.simulator.load(commands);
  }

  play() {
    this.simulator.play();
  }

  pause() {
    this.simulator.pause();
  }

  step() {
    this.simulator.step();
  }

  reset() {
    this.simulator.reset();
  }

  setSpeed(ms: number) {
    this.simulator.setSpeed(ms);
  }

  getContext() {
    return this.simulator.getContext();
  }
}

export const executionEngine = new ExecutionEngine();
