import type { SourceLocation } from 'acorn';
import { Command } from './command';
import type { ExecutionContext } from '@core/simulator/execution-context';

export class PopCallStackCommand extends Command {
  constructor(loc: SourceLocation) {
    super(loc);
  }

  execute(ctx: ExecutionContext): void {
    ctx.popCallStack();
  }
}
