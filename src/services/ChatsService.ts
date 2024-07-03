import { ChatsApi } from "../api";
import { Router } from "../core";
import {
    IChat,
    ICreateChatData,
    IAddUserData,
    IDeleteUserData,
    IChatTokenData,
} from "../interfaces";
import { store } from "../core";
import { Routes } from "../config";

const router = new Router("#app");
const chatsApi = new ChatsApi();

export const getChats = async () => {
    const chats = await chatsApi.getChats();
    if (!chats) return;

    store.set("chats", chats);

    return chats;
};

export const createChat = async (data: ICreateChatData) => {
    try {
        await chatsApi.createChat(data);
        await getChats();
    } catch (error) {
        alert("Не получилось создать чат");
    }
};

export const selectChat = (chat: IChat) => {
    store.set("activeChat", chat);

    const currentPath = window.location.pathname;

    if (currentPath !== Routes.Messenger) {
        router.go(Routes.Messenger);
    }
};

export const deleteUser = async (data: IDeleteUserData) => {
    try {
        chatsApi.deleteUser(data);
        alert("Пользователь удален из чата");
    } catch (error) {
        alert("Не получилось удалить пользователя");
    }
};

export const addUser = async (data: IAddUserData) => {
    try {
        await chatsApi.addUser(data);
        alert("Пользователь добавлен в чат");
    } catch (error) {
        alert("Не получилось добавить пользователя");
    }
};

export const getChatToken = async (
    data: IChatTokenData,
): Promise<{ token: string }> => {
    try {
        return await chatsApi.getChatToken(data);
    } catch (error) {
        throw new Error("Не удалось получить токен чата");
    }
};
