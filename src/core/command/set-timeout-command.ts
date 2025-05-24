import { Command } from './command';
import type { ExecutionContext } from '@core/simulator/execution-context';
import type { Task } from '@core/simulator/execution-context';

export class SetTimeoutCommand extends Command {
  private callbackId: string;
  private delay: number;

  constructor(id: string, callbackId: string, delay: number, line: number) {
    super(id, line, `setTimeout(${delay}ms)`);
    this.callbackId = callbackId;
    this.delay = delay;
  }

  execute(ctx: ExecutionContext): void {
    // 1. Web API 영역에 등록
    ctx.addWebApiTask({ id: this.callbackId, label: `setTimeout` });

    // 2. 즉시 Task Queue에 등록 (지연 시뮬레이션은 Simulator 측에서 처리)
    const callbackTask: Task = {
      id: this.callbackId,
      execute: () => {
        ctx.enqueueTask({
          id: this.callbackId,
          execute: () => {
            ctx.appendConsoleLog(`(timeout callback) ${this.callbackId}`);
          },
        });
      },
    };

    callbackTask.execute(); // 실제 등록

    // 3. Web API에서 제거 (시각화상에서 타임라인이 이 타이밍을 제어할 수도 있음)
    ctx.removeWebApiTask(this.callbackId);
  }
}
