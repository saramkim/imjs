import type { ExecutionContext } from '@core/simulator/execution-context';
import type { SourceLocation } from 'acorn';

export abstract class Command {
  private readonly _loc: SourceLocation;
  private readonly _label?: string;

  constructor(loc: SourceLocation, label?: string) {
    this._loc = loc;
    this._label = label;
  }

  get loc(): SourceLocation {
    return this._loc;
  }
  get label(): string | undefined {
    return this._label;
  }

  abstract execute(ctx: ExecutionContext): void;
}
