import { EventBus } from "../EventBus";
import { IChat, IMessage, IUser } from "../../interfaces";
import { set } from "../../utils";

export enum StoreEvents {
    UPDATED = "Updated",
}

export interface State {
    user: IUser;
    chats: IChat[];
    activeChat: IChat | null;
    messages: IMessage[];
}

class Store extends EventBus {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private _state: any = {};

    getState(): State {
        return this._state;
    }

    set(path: string, value: unknown) {
        this._state = set(this._state, path, value);
        this.emit(StoreEvents.UPDATED, this._state as object);
    }
}

export default new Store();
