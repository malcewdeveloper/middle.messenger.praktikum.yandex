import { Chat } from "../../components";
import { Block, type BlockProps } from "../../core/Block";
import { Badge } from "../../ui";
import template from "./ChatsPanel.hbs?raw";

interface IChatsPanelProps extends BlockProps {}

const chats = [
    {
        title: "Vasy Pupkin",
        lastMessageMe: false,
        preview: "Но что там, как дела, когда гулять пойдем с тобой?",
        date: "12.05.24",
        unreadMessages: new Badge({
            badge: 2,
            attributes: {
                class: "badge",
            },
        }),
    },
    {
        title: "Maksim Maksim",
        lastMessageMe: true,
        preview: "Когда ты уже будешь senior?",
        date: "Вчера",
    },
    {
        title: "Группа Счастья",
        lastMessageMe: false,
        preview: "Когда ты уже будешь senior?",
        date: "12:56",
        unreadMessages: new Badge({
            badge: 5,
            attributes: {
                class: "badge",
            },
        }),
    },
];

class ChatItem extends Block {
    constructor(props: BlockProps) {
        super({
            ...props,
        });
    }

    render() {
        return this.compile(
            "<li class='chats-panel__item'>{{{Chat}}}</li>",
            this._props,
        );
    }
}

export default class ChatsPanel extends Block {
    constructor(props: IChatsPanelProps) {
        super({
            ...props,
            chats: chats.map(
                (chat) =>
                    new ChatItem({
                        Chat: new Chat({
                            ...chat,
                        }),
                    }),
            ),
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
