import { Block, type BlockProps } from "../../core/Block";
import template from "./Avatar.hbs?raw";

interface IAvatarProps extends BlockProps {
    image?: {
        src: string;
        alt: string;
    };
    attributes: {
        class: string;
        "data-size": "small" | "middle" | "big";
    } & Record<string, string>;
}

export default class Avatar extends Block {
    constructor(props: IAvatarProps) {
        super(props);
    }

    render() {
        return this.compile(template, this._props);
    }
}
