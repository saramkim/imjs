import type { Command } from '../command/command';
import type { SourceLocation } from 'acorn';

export interface Task {
  id: string;
  execute: () => void;
}

export interface WebApiTask {
  id: string;
  label: string;
  remaining: number;
  callbackCmds: Command[];
  loc?: SourceLocation;
}

export class ExecutionContextState {
  /* UI 패널용 상태들 */
  callStack: { name: string; loc: SourceLocation }[] = [];
  consoleOutput: { msg: string; loc: SourceLocation }[] = [];
  taskQueue: Command[][] = [];
  webApi: WebApiTask[] = [];
}

export class ExecutionContext extends ExecutionContextState {
  private asyncEnabled = true;

  setAsyncEnabled(enabled: boolean) {
    this.asyncEnabled = enabled;
  }

  pushCallStack(name: string, loc: SourceLocation) {
    this.callStack.push({ name, loc });
  }

  popCallStack() {
    this.callStack.pop();
  }

  advanceTimers(deltaMs: number) {
    for (let i = this.webApi.length - 1; i >= 0; i--) {
      const task = this.webApi[i];
      task.remaining -= deltaMs;

      if (task.remaining <= 0) {
        this.taskQueue.push(task.callbackCmds);
        this.webApi.splice(i, 1);
      }
    }
  }

  dequeueCallback(): Command[] | undefined {
    return this.taskQueue.shift();
  }

  hasReadyCallback(): boolean {
    return this.callStack.length === 0 && this.taskQueue.length > 0;
  }

  getWebApiTasks(): WebApiTask[] {
    return [...this.webApi];
  }

  addWebApiTask(task: WebApiTask) {
    if (this.asyncEnabled) {
      this.webApi.push(task);
    }
  }

  removeWebApiTask(taskId: string) {
    this.webApi = this.webApi.filter((task) => task.id !== taskId);
  }

  appendConsoleLog(message: string, loc: SourceLocation) {
    this.consoleOutput.push({ msg: message, loc });
  }

  clearConsole() {
    this.consoleOutput.length = 0;
  }
}
