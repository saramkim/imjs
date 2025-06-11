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
  private stepMs = 500;

  load(commands: Command[]) {
    this.commands = commands;
    this.ctx = new ExecutionContext();
    this.currentIndex = 0;
    this.emit('load', commands);
  }

  step() {
    this.ctx.advanceTimers(this.stepMs);

    if (this.currentIndex >= this.commands.length) {
      if (this.ctx.hasReadyCallback()) {
        const cb = this.ctx.dequeueCallback();
        if (cb) this.commands.push(...cb);
      } else {
        this.pause();
        return;
      }
    }

    const cmd = this.commands[this.currentIndex];
    cmd.execute(this.ctx);
    this.currentIndex++;

    this.emit('step', this.ctx);
  }

  play() {
    if (this.intervalId !== null) return;
    this.intervalId = window.setInterval(() => this.step(), this.stepMs);
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
    this.load(this.commands);
    this.emit('reset');
  }

  setSpeed(ms: number) {
    this.stepMs = ms;
    if (this.intervalId !== null) {
      this.pause();
      this.play();
    }
    this.emit('setSpeed', ms);
  }

  getContext() {
    return this.ctx;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }
}
