import { Block, type BlockProps } from "../../core";
import { Button } from "../../ui";
import { Input } from "../Input";
import { validator, TypePattern } from "../../utils";
import template from "./UpdatePassword.hbs?raw";
import { changePassword } from "../../services";
import { IChangePasswordData } from "../../interfaces";

interface IUpdatePasswordProps extends BlockProps {
    onSubmit: () => void;
}

export default class UpdatePassword extends Block {
    constructor(props: IUpdatePasswordProps) {
        const oldPassword = new Input({
            name: "oldPassword",
            placeholder: "Старый пароль",
            type: "password",
            events: {
                blur: (e) => {
                    oldPassword.handleBlur(e, "password");
                },
            },
        });

        const newPassword = new Input({
            name: "newPassword",
            placeholder: "Новый пароль",
            type: "password",
            events: {
                blur: (e) => {
                    newPassword.handleBlur(e, "password");
                },
            },
        });

        super({
            ...props,
            oldPassword,
            newPassword,
            Button: new Button({
                text: "Обновить аккаунт",
                attributes: {
                    class: "button",
                    type: "submit",
                },
                events: {
                    click: async (event) => {
                        event.preventDefault();

                        const inputs = [oldPassword, newPassword];

                        const result: Record<string, string> = {};
                        let isAllCheckSuccess = true;

                        inputs.forEach((input) => {
                            const el = input
                                .getContent()
                                .querySelector("input");
                            if (!el) return;

                            const { isValid, message } = validator(
                                el.value,
                                el.name as TypePattern,
                            );

                            if (!isValid) {
                                this.setProps({
                                    error: true,
                                    errorMessage:
                                        "Пожалуйста, проверьте введенные данные и&nbsp;повторите попытку.",
                                });

                                input.setProps({
                                    error: true,
                                    errorMessage: message,
                                });

                                isAllCheckSuccess = false;
                            }

                            result[el.name] = el.value;
                        });

                        if (isAllCheckSuccess) {
                            await changePassword(
                                result as unknown as IChangePasswordData,
                            );
                            props.onSubmit();
                        } else {
                            console.log("Validation error");
                        }
                    },
                },
            }),
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
