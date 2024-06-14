type EventName = string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallbackType = (...args: any[]) => void;

export default class EventBus {
    private readonly listeners: Record<EventName, CallbackType[]>;

    constructor() {
        this.listeners = {};
    }

    on(event: EventName, callback: CallbackType) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off(event: EventName, callback: CallbackType) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback,
        );
    }

    emit(event: EventName, ...args: unknown[]) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
