import { HTTPTransport } from "../core";
import {
    IChat,
    ICreateChatData,
    IAddUserData,
    IChatTokenData,
    IDeleteUserData,
} from "../interfaces";

const chatsApi = new HTTPTransport("/chats");

export class ChatsApi {
    async getChats(): Promise<IChat[]> {
        return chatsApi.get("");
    }

    async createChat(data: ICreateChatData): Promise<ICreateChatData | Error> {
        return chatsApi.post("", {
            data,
            headers: { "Content-Type": "application/json" },
        });
    }

    async deleteUser(data: IDeleteUserData): Promise<void | Error> {
        return chatsApi.delete("/users", {
            data,
            headers: { "Content-Type": "application/json" },
        });
    }

    async addUser(data: IAddUserData): Promise<void | Error> {
        return chatsApi.put("/users", {
            data,
            headers: { "Content-Type": "application/json" },
        });
    }

    async getChatToken(data: IChatTokenData): Promise<{ token: string }> {
        return chatsApi.post(`/token/${data.id}`, {
            headers: { "Content-Type": "application/json" },
        });
    }
}
