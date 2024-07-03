import { Block, type BlockProps } from "../../core";
import template from "./Modal.hbs?raw";

interface IModalProps extends BlockProps {
    title: string;
    children: Block[];
}

export default class Modal extends Block {
    constructor(props: IModalProps) {
        super({ ...props });
    }

    render() {
        return this.compile(template, this._props);
    }
}
