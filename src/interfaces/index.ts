export interface ILoginData {
    login: string;
    password: string;
}

export interface IRegisterData {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
    password: string;
}

export interface ICreateChatData {
    title: string;
}

export interface IDeleteChatData {
    chatId: number;
}

export interface IAddUserData {
    chatId: number;
    users: number[];
}

export interface IDeleteUserData {
    chatId: number;
    users: number[];
}

export interface IChangePasswordData {
    oldPassword: string;
    newPassword: string;
}

export type IUpdateUserData = Omit<IUser, "id" | "avatar">;

export interface IChatTokenData {
    id: number;
}

export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
    login: string;
    avatar: string | null;
    email: string;
}

export interface IChat {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: {
        id: number;
        user: IUser;
        content: string;
        time: string;
    };
}

export interface IMessage {
    chat_id: IChat["id"];
    time: string;
    type: string;
    user_id: IUser["id"];
    content: string;
    file?: {
        id: number;
        user_id: number;
        path: string;
        filename: string;
        content_type: string;
        content_size: number;
        upload_url: string;
    };
}
