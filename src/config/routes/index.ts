export enum Routes {
    Login = "/",
    SignUp = "/sign-up",
    Messenger = "/messenger",
    Profile = "/settings",
    NotFound = "/not-found",
    Error = "/error",
}

export const protectedRoutes = [Routes.Messenger, Routes.Profile];
