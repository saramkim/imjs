import type { SourceLocation } from 'acorn';
import { Command } from './command';
import type { ExecutionContext } from '@core/simulator/execution-context';

export class ConsoleLogCommand extends Command {
  private message: string;

  constructor(loc: SourceLocation, message: string) {
    super(loc);
    this.message = message;
  }

  execute(ctx: ExecutionContext): void {
    ctx.appendConsoleLog(this.message, this.loc);
  }

  getMessage(): string {
    return this.message;
  }

  getSteps(): number {
    return 1;
  }
}
