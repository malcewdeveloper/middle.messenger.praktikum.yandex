import { EventBus } from "../EventBus";

export enum WS_EVENTS {
    CONNECTED = "ws:connected",
    ERROR = "ws:error",
    MESSAGE = "ws:message",
    CLOSE = "ws:close",
}

export default class WSTransport extends EventBus {
    private _ws: WebSocket | null = null;
    private _pingInterval: number = 0;
    private readonly _url: string;

    constructor(url: string) {
        super();
        this._url = url;
    }

    send(data: { type: string; content?: string }) {
        if (!this._ws) {
            throw new Error("WebSocket is not connected");
        }
        this._ws.send(JSON.stringify(data));
    }

    connect() {
        this._ws = new WebSocket(this._url);

        this._subscribe(this._ws);

        this._ping();

        return new Promise<void>((resolve) => {
            this.on(WS_EVENTS.CONNECTED, () => {
                resolve();
            });
        });
    }

    disconect() {
        this._ws?.close();
    }

    private _subscribe(ws: WebSocket) {
        ws.addEventListener("open", () => {
            this.emit(WS_EVENTS.CONNECTED);
        });

        ws.addEventListener("close", () => {
            this.emit(WS_EVENTS.CLOSE);
        });

        ws.addEventListener("error", (error) => {
            this.emit(WS_EVENTS.ERROR, error);
        });

        ws.addEventListener("message", (event) => {
            try {
                const data = JSON.parse(event.data);

                if (
                    !(
                        data.type &&
                        (data.type === "pong" || data.type === "user connected")
                    )
                ) {
                    this.emit(WS_EVENTS.MESSAGE, data);
                }
            } catch (error) {
                throw Error("Error parsing message");
            }
        });
    }

    private _ping() {
        this._pingInterval = setInterval(() => {
            this.send({ type: "ping" });
        }, 5000);

        this.on(WS_EVENTS.CLOSE, () => {
            clearInterval(this._pingInterval);
            this._pingInterval = 0;
        });
    }
}
