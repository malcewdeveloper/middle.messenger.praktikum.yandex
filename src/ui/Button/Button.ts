import { Block } from "../../core/Block";
import { BlockProps } from "../../core/Block/Block";
import templateButton from "./Button.hbs?raw";

interface IButtonProps extends BlockProps {
    text?: string;
    iconStart?: string;
    iconEnd?: string;
    attributes: Record<string, string>;
}

export default class Button extends Block {
    constructor(props: IButtonProps) {
        super(props);
    }

    render() {
        return this.compile(templateButton, this._props);
    }
}
