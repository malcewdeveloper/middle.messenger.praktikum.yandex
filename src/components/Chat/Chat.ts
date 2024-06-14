import { Block, type BlockProps } from "../../core/Block";
import { Avatar } from "../../ui";
import template from "./Chat.hbs?raw";

interface IChatProps extends BlockProps {
    avatar?: Block;
    title: string;
    lastMessageMe: boolean;
    preview: string;
    date: string;
    unreadMessages?: Block;
    attributes?: Record<string, string>;
}

export default class Chat extends Block {
    constructor(props: IChatProps) {
        super({
            ...props,
            avatar: new Avatar({
                attributes: {
                    class: "avatar",
                    "data-size": "middle",
                },
            }),
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
