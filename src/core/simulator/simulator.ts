import type { Command } from '@core/command/command';
import { ExecutionContext } from '@core/simulator/execution-context';
import { EventEmitter } from '@core/simulator/event-emitter';

export class Simulator extends EventEmitter<{
  load: Command[];
  play: void;
  pause: void;
  step: ExecutionContext;
  reset: void;
  setSpeed: number;
}> {
  private commands: Command[] = [];
  private ctx: ExecutionContext = new ExecutionContext();
  private currentIndex = 0;
  private intervalId: number | null = null;
  private speed = 500; // ms per step

  load(commands: Command[]) {
    this.commands = commands;
    this.ctx = new ExecutionContext();
    this.currentIndex = 0;
    this.emit('load', commands);
  }

  step() {
    if (this.currentIndex >= this.commands.length) return;

    const command = this.commands[this.currentIndex];
    command.execute(this.ctx);
    this.currentIndex++;
    this.emit('step', this.ctx);
  }

  play() {
    if (this.intervalId !== null) return;

    this.intervalId = window.setInterval(() => {
      if (this.currentIndex >= this.commands.length) {
        this.pause();
        return;
      }
      this.step();
    }, this.speed);
    this.emit('play');
  }

  pause() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.emit('pause');
    }
  }

  reset() {
    this.pause();
    this.ctx = new ExecutionContext();
    this.currentIndex = 0;
    this.emit('reset');
  }

  setSpeed(ms: number) {
    this.speed = ms;
    this.emit('setSpeed', ms);
  }

  getContext() {
    return this.ctx;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }
}
