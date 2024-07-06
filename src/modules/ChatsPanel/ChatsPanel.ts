import { Chat, CreateChat } from "../../components";
import { Block, type BlockProps } from "../../core/Block";
import { connect } from "../../core";
import { IChat } from "../../interfaces";
import { Avatar, Badge, Button, Modal } from "../../ui";
import { store } from "../../core";
import template from "./ChatsPanel.hbs?raw";
import MessagesService from "../../services/MessagesService";
import { getChats, getChatToken, selectChat } from "../../services";

interface IChatsPanelProps extends BlockProps {
    chats?: IChat[];
    activeChat?: IChat;
}

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

class _ChatsPanel extends Block<IChatsPanelProps> {
    constructor(props: IChatsPanelProps) {
        const modal: Modal = new Modal({
            title: "Добавить новый чат",
            children: [
                new CreateChat({
                    onSubmit: () => modal.hide(),
                }),
            ],
        });

        super({
            ...props,
            Button: new Button({
                text: "+",
                attributes: {
                    class: "chats-panel__button-create",
                },
                events: {
                    click: () => {
                        modal.show();
                    },
                },
            }),
            Modal: modal,
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}

const ChatsPanel = connect((state) => ({
    chats: state.chats?.map(
        (chat) =>
            new ChatItem({
                Chat: new Chat({
                    title: chat.title,
                    lastMessageMe: false,
                    preview: chat.last_message?.content,
                    date: chat.last_message?.time,
                    unreadMessages:
                        chat.unread_count > 0
                            ? new Badge({
                                  badge: chat.unread_count,
                                  attributes: {
                                      class: "badge",
                                  },
                              })
                            : undefined,
                    avatar: new Avatar({
                        image: {
                            src: chat.avatar,
                            alt: "Аватар чата",
                        },
                        attributes: {
                            class: "avatar",
                            "data-size": "small",
                        },
                    }),
                    events: {
                        click: () => {
                            const { activeChat, user } = store.getState();

                            if (activeChat && activeChat.id !== chat.id) {
                                MessagesService.disconnect();
                            }

                            selectChat(chat);

                            store.set("messages", []);

                            getChatToken({ id: chat.id }).then(({ token }) => {
                                MessagesService.connect(
                                    token,
                                    user.id,
                                    chat.id,
                                );
                            });

                            getChats();
                        },
                    },
                }),
            }),
    ),
}))(_ChatsPanel as typeof Block);

export default ChatsPanel;
