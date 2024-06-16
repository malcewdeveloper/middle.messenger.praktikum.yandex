import { Block, type BlockProps } from "../Block";
import { render } from "../RenderDOM";

const isEqual = (lhs: string, rhs: string) => lhs === rhs;

export class Route {
    private _pathname: string;
    private _blockClass: typeof Block | null = null;
    private _block: Block | null = null;
    private _props?: BlockProps | null = null;

    constructor(pathname: string, view: typeof Block, props?: BlockProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block && this._blockClass && this._props) {
            this._block = new this._blockClass(this._props);
            render(this._props.rootQuery as string, this._block);
            return;
        }
    }
}
