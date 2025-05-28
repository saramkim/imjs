type EventCallback<T> = (data: T) => void;

type EventParams<T, K extends keyof T> = T[K] extends void ? [K] : [K, T[K]];

export abstract class EventEmitter<T extends object> {
  private subscribers: {
    [K in keyof T]?: EventCallback<T[K]>[];
  } = {};

  subscribe<K extends keyof T>(event: K, callback: EventCallback<T[K]>) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event]?.push(callback);
  }

  emit<K extends keyof T>(...[event, data]: EventParams<T, K>) {
    this.subscribers[event]?.forEach((callback) => callback(data as T[K]));
  }
}
