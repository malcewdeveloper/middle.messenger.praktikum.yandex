import { Block, type BlockProps } from "../../core/Block";
import template from "./Form.hbs?raw";

interface IFormProps extends BlockProps {
    title: string;
    children: Block[];
    actions: Block[];
    attributes?: Record<string, string>;
}

export default class Form extends Block {
    constructor(props: IFormProps) {
        super(props);
    }

    render() {
        return this.compile(template, this._props);
    }
}
