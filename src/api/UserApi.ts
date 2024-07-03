import { IUser, IUpdateUserData, IChangePasswordData } from "../interfaces";
import { HTTPTransport } from "../core";

const userApi = new HTTPTransport("/user");

export class UserApi {
    async changePassword(data: IChangePasswordData): Promise<void | Error> {
        return userApi.put("/password", {
            headers: { "Content-Type": "application/json" },
            data,
        });
    }

    async changeAvatar(file: File): Promise<IUser | Error> {
        const data = new FormData();
        data.append("avatar", file);
        return userApi.put("/profile/avatar", { data });
    }

    async updateProfile(data: IUpdateUserData): Promise<IUser | Error> {
        return userApi.put("/profile", {
            headers: { "Content-Type": "application/json" },
            data,
        });
    }

    async getUserByLogin(data: { login: string }): Promise<IUser[] | Error> {
        return userApi.post("/search", {
            headers: { "Content-Type": "application/json" },
            data,
        });
    }
}
