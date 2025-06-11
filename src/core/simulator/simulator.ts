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
    const flattened = this.flattenCommands(commands);
    this.commands = flattened;
    this.ctx = new ExecutionContext();
    this.ctx.setAsyncEnabled(false);
    this.currentIndex = 0;
    this.emit('load', flattened);
  }

  private flattenCommands(commands: Command[]): Command[] {
    const ctx = new ExecutionContext();
    const queue = [...commands];
    const flat: Command[] = [];
    let index = 0;

    while (index < queue.length || ctx.getWebApiTasks().length > 0 || ctx.taskQueue.length > 0) {
      if (index < queue.length) {
        const cmd = queue[index];
        cmd.execute(ctx);
        flat.push(cmd);
        index++;
      } else if (ctx.hasReadyCallback()) {
        const cb = ctx.dequeueCallback();
        if (cb) queue.push(...cb);
      } else if (ctx.getWebApiTasks().length > 0) {
        const min = Math.min(...ctx.getWebApiTasks().map((t) => t.remaining));
        ctx.advanceTimers(min);
      }
    }

    return flat;
  }

  step() {
    if (this.currentIndex >= this.commands.length) {
      this.pause();
      return;
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
