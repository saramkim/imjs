import { Interpreter } from '@core/interpreter/interpreter';
import { Simulator } from '@core/simulator/simulator';

class ExecutionEngine {
  private interpreter = new Interpreter();
  private simulator = new Simulator();

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

  getCurrentIndex() {
    return this.simulator.getCurrentIndex();
  }

  getTotalCommands() {
    return this.simulator.getTotalCommands();
  }
}

export const executionEngine = new ExecutionEngine();
