import {
    LoginSubmitData,
    RegisterUserSubmitData,
    RegisterUserResponseData,
    User,
} from "../interfaces";
import { HTTPTransport } from "../core";

const authApi = new HTTPTransport("/auth");

export default class AuthApi {
    async login(data: LoginSubmitData): Promise<void | Error> {
        return authApi.post("/signin", {
            headers: {
                "Content-Type": "application/json",
            },
            data,
        });
    }

    async register(
        data: RegisterUserSubmitData,
    ): Promise<RegisterUserResponseData> {
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

    async getUser(): Promise<User | Error> {
        return authApi.get("/user");
    }
}
