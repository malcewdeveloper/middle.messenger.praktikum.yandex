import "./global.scss";
import * as Pages from "./pages";
import { Block, Router } from "./core";
import { protectedRoutes, Routes } from "./config";
import { getCurrentUser, getChats } from "./services";

document.addEventListener("DOMContentLoaded", async () => {
    const router = new Router("#app");

    router
        .use("/", Pages.LoginPage as typeof Block)
        .use("/sign-up", Pages.RegisterPage as typeof Block)
        .use("/messenger", Pages.ChatPage as typeof Block)
        .use("/settings", Pages.ProfilePage as typeof Block)
        .use("/not-found", Pages.NotFound as typeof Block)
        .use("/error", Pages.ErrorPage as typeof Block)
        .start();

    const isRouteProtected = protectedRoutes.includes(
        window.location.pathname as Routes,
    );

    try {
        await getCurrentUser();
        await getChats();

        if (!isRouteProtected) {
            router.go(Routes.Messenger);
        }
    } catch (error) {
        console.log(error); // Убрать

        if (isRouteProtected) {
            router.go(Routes.Login);
        }
    }
});
