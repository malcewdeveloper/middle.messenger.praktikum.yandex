import { BottomPanel, TopPanel } from "../../components";
import { Block, type BlockProps } from "../../core/Block";
import { Message } from "../../ui";
import template from "./ChatPreview.hbs?raw";

interface IChatPreviewProps extends BlockProps {}

const messages = [
    {
        content: {
            image: "src/assets/avatar.jpg",
            text: "Привет! Я успешно завершил второй сприн",
        },
        time: "16:10",
        isRead: true,
        isMessageMe: true,
    },
    {
        content: {
            image: null,
            text: "Привет! Вау это правда круто, ты молодец!",
        },
        time: "16:20",
        isRead: true,
        isMessageMe: false,
    },
];

export default class ChatPreview extends Block {
    constructor(props: IChatPreviewProps) {
        super({
            ...props,
            topPanel: new TopPanel({
                title: "Maksim",
                attributes: {
                    class: "top-panel",
                },
            }),
            bottomPanel: new BottomPanel({}),
            messages: messages.map(
                (message) =>
                    new Message({
                        ...message,
                        attributes: {
                            class: `message${message.isMessageMe ? " message_me" : ""}`,
                        },
                    }),
            ),
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
