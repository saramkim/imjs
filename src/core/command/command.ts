import type { ExecutionContext } from '@core/simulator/execution-context';

export abstract class Command {
  private readonly _id: string;
  private readonly _line: number;
  private readonly _label?: string;

  constructor(id: string, line: number, label?: string) {
    this._id = id;
    this._line = line;
    this._label = label;
  }

  get id(): string {
    return this._id;
  }
  get line(): number {
    return this._line;
  }
  get label(): string | undefined {
    return this._label;
  }

  abstract execute(ctx: ExecutionContext): void;
}
