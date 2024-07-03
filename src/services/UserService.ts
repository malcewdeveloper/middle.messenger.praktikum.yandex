import { UserApi } from "../api";
import { store } from "../core";
import { IChangePasswordData, IUser } from "../interfaces";

const userApi = new UserApi();

export const changePassword = async (data: IChangePasswordData) => {
    try {
        userApi.changePassword(data);
    } catch (error) {
        console.log(`Error occurred while changing password`);
    }
};

export const changeAvatar = async (file: File) => {
    try {
        const response = await userApi.changeAvatar(file); // Проверить на работоспособность, что возращается в response?

        store.set("user", response);
    } catch (error) {
        console.log(`Error occurred while changing avatar`);
    }
};

export const updateProfile = async (data: IUser) => {
    try {
        const newUser = await userApi.updateProfile(data);

        store.set("user", newUser);
    } catch (error) {
        console.log(`Error occurred while changing user`);
    }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const searchUser = async (login: string): Promise<IUser | any> => {
    try {
        const users = (await userApi.getUserByLogin({
            login: login,
        })) as IUser[];

        if (users.length > 0) {
            return users[0];
        }

        alert("Пользователь не найден");
    } catch (error) {
        console.log(`Error occurred while searching user`);
    }
};
