import type { SourceLocation } from 'acorn';
import { Command } from './command';
import type { ExecutionContext } from '@core/simulator/execution-context';

export class PushCallStackCommand extends Command {
  private fnName: string;

  constructor(loc: SourceLocation, fnName: string) {
    super(loc, fnName);
    this.fnName = fnName;
  }

  execute(ctx: ExecutionContext): void {
    ctx.pushCallStack(this.fnName, this.loc);
  }

  getSteps(): number {
    return 1;
  }
}
