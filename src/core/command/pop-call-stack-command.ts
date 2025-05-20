import { Command } from './command';
import type { ExecutionContext } from '../simulator/execution-context';

export class PopCallStackCommand extends Command {
  constructor(id: string, line: number) {
    super(id, line, 'return');
  }

  execute(ctx: ExecutionContext): void {
    ctx.popCallStack();
  }
}
