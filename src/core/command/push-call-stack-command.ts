import type { SourceLocation } from 'acorn';
import { Command } from './command';
import type { ExecutionContext } from '@core/simulator/execution-context';

export class PushCallStackCommand extends Command {
  private fnName: string;

  constructor(fnName: string, loc: SourceLocation) {
    super(loc, `call ${fnName}`);
    this.fnName = fnName;
  }

  execute(ctx: ExecutionContext): void {
    ctx.pushCallStack(this.fnName);
  }
}
