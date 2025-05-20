import type { Command } from '../command/command';
import { ExecutionContext } from './execution-context';

export class Simulator {
  private commands: Command[] = [];
  private ctx: ExecutionContext = new ExecutionContext();
  private currentIndex = 0;
  private intervalId: number | null = null;
  private speed = 500; // ms per step

  load(commands: Command[]) {
    this.commands = commands;
    this.ctx = new ExecutionContext();
    this.currentIndex = 0;
  }

  step() {
    if (this.currentIndex >= this.commands.length) return;

    const command = this.commands[this.currentIndex];
    command.execute(this.ctx);
    this.currentIndex++;
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
  }

  pause() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.pause();
    this.ctx = new ExecutionContext();
    this.currentIndex = 0;
  }

  setSpeed(ms: number) {
    this.speed = ms;
    if (this.intervalId !== null) {
      this.pause();
      this.play();
    }
  }

  getContext() {
    return this.ctx;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  getTotalCommands() {
    return this.commands.length;
  }
}
