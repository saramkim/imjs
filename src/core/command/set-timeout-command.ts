import { Command } from './command';
import type { ExecutionContext } from '@core/simulator/execution-context';
import type { SourceLocation } from 'acorn';

export class SetTimeoutCommand extends Command {
  private callbackCmds: Command[];
  private delay: number;

  constructor(loc: SourceLocation, callbackCmds: Command[], delay: number, label: string) {
    super(loc, label);
    this.callbackCmds = callbackCmds;
    this.delay = delay;
  }

  execute(ctx: ExecutionContext): void {
    const taskId = `setTimeout-${this.loc.start.line}`;
    ctx.addWebApiTask({
      id: taskId,
      label: this.label ?? 'setTimeout',
      remaining: this.delay,
      callbackCmds: this.callbackCmds,
      loc: this.loc,
    });
  }

  getSteps(): number {
    return this.callbackCmds.reduce((acc, command) => acc + command.getSteps(), 0) + 1;
  }
}
