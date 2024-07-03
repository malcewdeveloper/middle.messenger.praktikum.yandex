import { WSTransport, store } from "../core";
import { WS_EVENTS } from "../core/WSTransport/WSTransport";
import { IChat, IMessage, IUser } from "../interfaces";

class MessageController {
    private _ws: WSTransport | null = null;

    async connect(token: string, userId: IUser["id"], chatId: IChat["id"]) {
        this._ws = new WSTransport(
            `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`,
        );
        await this._ws.connect();

        this._addWebsocketListeners();

        this._getOldMessages();
    }

    sendMessage(message: string) {
        if (!this._ws) {
            throw new Error(`Chat is not connected`);
        }
        this._ws.send({ type: "message", content: message });
    }

    private _getOldMessages() {
        if (!this._ws) {
            throw new Error(`Chat is not connected`);
        }
        this._ws.send({ type: "get old", content: "0" });
    }

    private _addWebsocketListeners() {
        if (!this._ws) {
            throw new Error(`Chat is not connected`);
        }
        this._ws.on(WS_EVENTS.MESSAGE, (message: IMessage | IMessage[]) =>
            this._onMessage(message),
        );
    }

    private _onMessage(messages: IMessage | IMessage[]) {
        let incomingMessages: IMessage[] = [];

        if (Array.isArray(messages)) {
            incomingMessages = messages;
        } else {
            incomingMessages.push(messages);
        }
        const lastMessages = store.getState().messages || [];
        const messagesToStore = [...lastMessages, ...incomingMessages].sort(
            (a: IMessage, b: IMessage) =>
                new Date(a.time).getTime() - new Date(b.time).getTime(),
        );
        store.set("messages", messagesToStore);
    }

    disconnect() {
        this._ws?.disconect();
        store.set("messages", []);
    }
}

export default new MessageController();
