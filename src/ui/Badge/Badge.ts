import { Block, type BlockProps } from "../../core/Block";
import template from "./Badge.hbs?raw";

interface IBadgeProps extends BlockProps {
    badge: string | number;
    attributes: Record<string, string>;
}

export default class Badge extends Block {
    constructor(props: IBadgeProps) {
        super(props);
    }

    render() {
        return this.compile(template, this._props);
    }
}
