import { Block, store, type BlockProps } from "../../core";
import { deleteUser, searchUser } from "../../services";
import { Button } from "../../ui";
import { Input } from "../Input";
import template from "./DeleteUser.hbs?raw";

interface IDeleteUserProps extends BlockProps {
    onSubmit: () => void;
}

export default class DeleteUser extends Block {
    constructor(props: IDeleteUserProps) {
        const userInput = new Input({
            type: "text",
            name: "login",
            placeholder: "Логин",
        });

        super({
            ...props,
            Input: userInput,
            Button: new Button({
                text: "Удалить",
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
                        const user = await searchUser(login);
                        const { activeChat } = store.getState();

                        if (user && activeChat) {
                            await deleteUser({
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
