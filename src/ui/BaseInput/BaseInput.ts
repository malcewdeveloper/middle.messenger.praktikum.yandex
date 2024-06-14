import { Block, type BlockProps } from "../../core/Block";
import template from "./BaseInput.hbs?raw";

export interface IBaseInputProps extends BlockProps {
    name: string;
    placeholder: string;
    value?: string;
    type: string;
    attributes?: Record<string, string>;
}

export default class Input extends Block {
    constructor(props: IBaseInputProps) {
        super(props);
    }

    render() {
        return this.compile(template, this._props);
    }
}
