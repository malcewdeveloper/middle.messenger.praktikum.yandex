import { ILoginData, IRegisterData, IUser } from "../interfaces";
import { HTTPTransport } from "../core";

const authApi = new HTTPTransport("/auth");

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

    async getUser(): Promise<IUser | Error> {
        return authApi.get("/user");
    }
}
