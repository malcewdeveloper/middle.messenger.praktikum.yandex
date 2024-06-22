export interface LoginSubmitData {
    login: string;
    password: string;
}

export interface RegisterUserSubmitData {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
}

export interface RegisterUserResponseData {
    id: number;
}

export interface ChatUser {
    id: number;
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    role: string;
}

export interface ChatType {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
}

export interface CreateChatSubmitData {
    title: string;
}

export interface CreateChatResponseData {
    id: number;
}

export interface DeleteChatSubmitData {
    chatId: number;
}

export interface GetChatUsersRequest {
    chatId: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
}

export interface DeleteChatResponseData {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
        created_by: number;
    };
}

export interface GetChatTokenRequest {
    id: number;
}

export interface GetChatTokenResponseData {
    token: string;
}

export interface ChangeChatAvatarSubmitData {
    chatId: number;
    file: File;
}

export interface AddUsersToChatSubmitData {
    chatId: number;
    users: number[];
}

export interface DeleteUsersFromChatSubmitData {
    chatId: number;
    users: number[];
}

export interface GetCommonChatRequest {
    id: number;
}

export interface NewMessagesResponse {
    chat_id: number;
    content: string | null;
    file: File | null;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}

export interface UserProfile {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface User {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string | null;
    email: string;
}

export interface UserPasswordSubmitData {
    oldPassword: string;
    newPassword: string;
}

export type GetCommonChatResponseData = ChatType;

export type ChatsList = ChatType[];

export type GetChatUsersResponse = ChatUser[];

export type ChangeChatAvatarResponseData = ChatType;
