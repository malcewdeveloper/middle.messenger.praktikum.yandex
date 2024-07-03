import { Block, type BlockProps } from "../../core";
import { createChat } from "../../services";
import { Button } from "../../ui";
import { Input } from "../Input";
import template from "./CreateChat.hbs?raw";

interface ICreateChatProps extends BlockProps {
    onSubmit: () => void;
}

export default class CreateChat extends Block {
    constructor(props: ICreateChatProps) {
        const chatTitleInput = new Input({
            type: "text",
            name: "title",
            placeholder: "Название",
        });

        super({
            ...props,
            Input: chatTitleInput,
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

                    const title = chatTitleInput
                        .getContent()
                        .querySelector("input")?.value;

                    if (title) {
                        await createChat({ title });
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
