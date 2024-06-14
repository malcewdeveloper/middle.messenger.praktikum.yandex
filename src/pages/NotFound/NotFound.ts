import { Block, type BlockProps } from "../../core/Block";
import template from "./NotFound.hbs?raw";

export default class NotFound extends Block {
    constructor(props: BlockProps) {
        super(props);
    }

    render() {
        return this.compile(template, this._props);
    }
}
