import type { SourceLocation } from 'acorn';
import { Command } from './command';
import type { ExecutionContext } from '@core/simulator/execution-context';

export class ConsoleLogCommand extends Command {
  private message: string;

  constructor(message: string, loc: SourceLocation) {
    super(loc, `console.log`);
    this.message = message;
  }

  execute(ctx: ExecutionContext): void {
    ctx.appendConsoleLog(this.message);
  }

  getMessage(): string {
    return this.message;
  }
}
