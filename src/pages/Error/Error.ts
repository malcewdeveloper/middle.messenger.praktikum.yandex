import { Block, type BlockProps } from "../../core/Block";
import template from "./Error.hbs?raw";

interface IErrorPageProps extends BlockProps {
    code: number;
    message: string;
}

export default class ErrorPage extends Block {
    constructor(props: IErrorPageProps) {
        super(props);
    }

    render() {
        return this.compile(template, this._props);
    }
}
