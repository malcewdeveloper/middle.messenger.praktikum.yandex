import { ILoginData, IRegisterData } from "../interfaces";
import { HTTPTransport } from "../core";

const authApi = new HTTPTransport("https://ya-praktikum.tech/api/v2/auth");

export class AuthApi {
    async login(data: ILoginData): Promise<void | Error> {
        return authApi.post("/signin", {
            headers: {
                "Content-Type": "application/json",
            },
            data,
        });
    }

    async register(data: IRegisterData): Promise<{ id: number }> {
        return authApi.post("/signup", {
            headers: {
                "Content-Type": "application/json",
            },
            data,
        });
    }

    async logout() {
        return authApi.post("/logout", {});
    }

    async getUser() {
        return authApi.get("/user");
    }
}
