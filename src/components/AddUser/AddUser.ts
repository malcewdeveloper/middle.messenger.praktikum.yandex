import { Block, store, type BlockProps } from "../../core";
import { addUser, searchUser } from "../../services";
import { Button } from "../../ui";
import { Input } from "../Input";
import template from "./AddUser.hbs?raw";

interface IAddUserProps extends BlockProps {
    onSubmit: () => void;
}

export default class AddUser extends Block {
    constructor(props: IAddUserProps) {
        const userInput = new Input({
            type: "text",
            name: "login",
            placeholder: "Логин",
        });

        super({
            ...props,
            Input: userInput,
            Button: new Button({
                text: "Добавить",
                attributes: {
                    class: "button",
                    type: "submit",
                },
            }),
            events: {
                submit: async (e) => {
                    e.preventDefault();

                    const login = userInput
                        .getContent()
                        .querySelector("input")?.value;

                    if (login) {
                        const { activeChat } = store.getState();
                        const user = await searchUser(login);

                        if (user && activeChat) {
                            await addUser({
                                chatId: activeChat.id,
                                users: [user.id],
                            });

                            props.onSubmit();
                        }
                    }

                    props.onSubmit();
                },
            },
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
