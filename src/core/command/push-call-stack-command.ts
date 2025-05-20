import { Command } from './command';
import type { ExecutionContext } from '../simulator/execution-context';

export class PushCallStackCommand extends Command {
  private fnName: string;

  constructor(id: string, fnName: string, line: number) {
    super(id, line, `call ${fnName}`);
    this.fnName = fnName;
  }

  execute(ctx: ExecutionContext): void {
    ctx.pushCallStack(this.fnName);
  }
}
