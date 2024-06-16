import { Route } from "./Route";
import { Block } from "../Block";

export default class Router {
    routes: Route[] = [];
    history: History | null = null;
    static __instance: Router | null = null;
    private _currentRoute: Route | null = null;
    private _rootQuery: string | null = null;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, {
            rootQuery: this._rootQuery,
        });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

        route.render();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }

    go(pathname: string) {
        this.history?.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        if (!this.history) {
            return;
        }

        this.history.back();
    }

    forward() {
        if (!this.history) {
            return;
        }

        this.history.forward();
    }
}
