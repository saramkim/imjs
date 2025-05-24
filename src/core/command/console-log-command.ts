import { Command } from './command';
import type { ExecutionContext } from '@core/simulator/execution-context';

export class ConsoleLogCommand extends Command {
  private message: string;

  constructor(id: string, message: string, line: number) {
    super(id, line, `console.log`);
    this.message = message;
  }

  execute(ctx: ExecutionContext): void {
    ctx.appendConsoleLog(this.message);
  }

  getMessage(): string {
    return this.message;
  }
}
