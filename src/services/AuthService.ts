import { Router } from "../core";
import { AuthApi } from "../api";
import { ILoginData, IRegisterData, IUser } from "../interfaces";
import { Routes } from "../config";
import { store } from "../core";

const authApi = new AuthApi();
const router = new Router("#app");

export const login = async (data: ILoginData) => {
    try {
        await authApi.login(data);
        await getCurrentUser();
        router.go(Routes.Messenger);
    } catch (error) {
        console.log(`Error occurred while login`);
    }
};

export const register = async (data: IRegisterData) => {
    try {
        await authApi.register(data);
        await getCurrentUser();
        router.go(Routes.Messenger);
    } catch (error) {
        if (error instanceof XMLHttpRequest && error.status === 409) {
            alert("Пользователь с таким логином уже существует");
        }

        console.log(`Error occurred while register`);
    }
};

export const logout = async () => {
    try {
        await authApi.logout();
        router.go(Routes.Login);
    } catch (error) {
        console.log(`Error occurred while logout`);
    }
};

export const getCurrentUser = async () => {
    const user = (await authApi.getUser()) as string;
    store.set("user", JSON.parse(user) as IUser);
};
