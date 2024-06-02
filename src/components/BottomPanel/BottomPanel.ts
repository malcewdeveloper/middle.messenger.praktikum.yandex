import { Block, type BlockProps } from "../../core/Block";
import { BaseInput, Button } from "../../ui";
import { TypePattern, validator } from "../../utils";
import template from "./BottomPanel.hbs?raw";

interface IBottomPanelProps extends BlockProps {}

const messageInput = new BaseInput({
    type: "text",
    name: "message",
    placeholder: "Сообщение",
    attributes: {
        class: "bottom-panel__input",
    },
    events: {
        blur: (e) => {
            const el = e.target as HTMLInputElement;

            const { isValid } = validator(el.value, "message");

            if (!isValid) {
                console.log("Validation error");
            }
        },
    },
});

export default class BottomPanel extends Block {
    constructor(props: IBottomPanelProps) {
        super({
            ...props,
            buttonStart: new Button({
                iconStart: "src/public/images/pin.svg",
                attributes: {
                    class: "bottom-panel__button bottom-panel__button-start",
                },
            }),
            Input: messageInput,
            buttonEnd: new Button({
                iconStart: "src/public/images/arrow-right.svg",
                attributes: {
                    class: "bottom-panel__button buttom-panel__button-end",
                },
            }),
            attributes: {
                class: "bottom-panel",
            },
            events: {
                submit: (e) => this.handleSubmit(e),
            },
        });
    }

    handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        const el = messageInput.getContent() as HTMLInputElement;

        if (!el) return;

        const { isValid } = validator(el.value, el.name as TypePattern);

        if (!isValid) {
            console.log("Validation error");
            return;
        }

        console.log({ [el.name]: el.value });

        el.value = "";
    }

    render() {
        return this.compile(template, this._props);
    }
}
