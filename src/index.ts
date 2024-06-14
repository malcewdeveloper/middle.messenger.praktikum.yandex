import "./global.scss";
import * as Pages from "./pages";
import { Block, render } from "./core";

interface Pages {
    [path: string]: Block;
}

const pages: Pages = {
    "/": new Pages.PreviewPage({}),
    "/main": new Pages.ChatPage({}),
    "/register": new Pages.RegisterPage({}),
    "/login": new Pages.LoginPage({}),
    "/profile": new Pages.ProfilePage({}),
    "/not-found": new Pages.NotFound({}),
    "/error": new Pages.ErrorPage({
        code: 500,
        message: "Ошибка сервера, обратись к разработчику!",
    }),
};

const navigate = () => {
    if (pages[window.location.pathname]) {
        const page = pages[window.location.pathname];

        render("#app", page);
    } else {
        render("#app", pages["/not-found"]);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    navigate();
});
