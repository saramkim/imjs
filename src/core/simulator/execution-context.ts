export interface Task {
  id: string;
  execute: () => void;
}

export interface WebApiTask {
  id: string;
  label: string;
}

export class ExecutionContextState {
  callStack: string[] = [];
  webApi: WebApiTask[] = [];
  taskQueue: Task[] = [];
  consoleOutput: string[] = [];
}

export class ExecutionContext extends ExecutionContextState {
  pushCallStack(fnName: string) {
    this.callStack.push(fnName);
  }

  popCallStack() {
    this.callStack.pop();
  }

  addWebApiTask(task: WebApiTask) {
    this.webApi.push(task);
  }

  removeWebApiTask(taskId: string) {
    this.webApi = this.webApi.filter((task) => task.id !== taskId);
  }

  enqueueTask(task: Task) {
    this.taskQueue.push(task);
  }

  dequeueTask() {
    return this.taskQueue.shift();
  }

  appendConsoleLog(message: string) {
    this.consoleOutput.push(message);
  }

  clearConsole() {
    this.consoleOutput = [];
  }
}
