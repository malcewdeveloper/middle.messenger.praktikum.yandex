import { Block, type BlockProps } from "../../core/Block";
import template from "./Message.hbs?raw";

interface IMessageProps extends BlockProps {
    content: {
        image: string | null;
        text: string | null;
    };
    time: string;
    isRead: boolean;
    isMessageMe: boolean;
    attributes: {
        class: string;
        "data-type"?: "text" | "image";
    } & Record<string, string>;
}

export default class Message extends Block {
    constructor(props: IMessageProps) {
        super(props);
    }

    render() {
        return this.compile(template, this._props);
    }
}
