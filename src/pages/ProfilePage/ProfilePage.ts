import { Block, type BlockProps } from "../../core/Block";
import { Avatar, Button } from "../../ui";
import { Input } from "../../components";
import template from "./ProfilePage.hbs?raw";
import { TypePattern, validator } from "../../utils";

interface IProfilePageProps extends BlockProps {}

class ProfileItem extends Block {
    constructor(props: BlockProps) {
        super(props);
    }

    render() {
        return this.compile(
            "<li class='profile__item'>{{{Input}}}</li>",
            this._props,
        );
    }
}

const loginInput = new Input({
    type: "text",
    placeholder: "ivanivanov",
    name: "login",
    label: "Логин",
    events: {
        blur: (e) => loginInput.handleBlur(e, "login"),
    },
});

const passwordInput = new Input({
    type: "password",
    placeholder: "*******",
    name: "password",
    label: "Пароль",
    events: {
        blur: (e) => passwordInput.handleBlur(e, "password"),
    },
});

const phoneInput = new Input({
    type: "phone",
    placeholder: "+79099673030",
    name: "phone",
    label: "Телефон",
    events: {
        blur: (e) => phoneInput.handleBlur(e, "phone"),
    },
});

const emailInput = new Input({
    type: "email",
    placeholder: "pochta@yandex.ru",
    name: "email",
    label: "Почта",
    events: {
        blur: (e) => emailInput.handleBlur(e, "email"),
    },
});

const nameInput = new Input({
    type: "text",
    placeholder: "Иван",
    name: "first_name",
    label: "Имя",
    events: {
        blur: (e) => nameInput.handleBlur(e, "first_name"),
    },
});

const surnameInput = new Input({
    type: "text",
    placeholder: "Иванов",
    name: "second_name",
    label: "Фамилия",
    events: {
        blur: (e) => surnameInput.handleBlur(e, "second_name"),
    },
});

export default class ProfilePage extends Block {
    constructor(props: IProfilePageProps) {
        const inputs = [
            loginInput,
            passwordInput,
            phoneInput,
            emailInput,
            nameInput,
            surnameInput,
        ];

        super({
            ...props,
            avatar: new Avatar({
                image: {
                    src: "src/assets/avatar.jpg",
                    alt: "User avatar",
                },
                attributes: {
                    class: "avatar",
                    "data-size": "big",
                },
            }),
            inputs: inputs.map(
                (input) =>
                    new ProfileItem({
                        Input: input,
                    }),
            ),
            actions: [
                new Button({
                    text: "Изменить пароль",
                    attributes: {
                        class: "button profile__actions-item profile__button",
                    },
                }),
                new Button({
                    text: "Выйти",
                    attributes: {
                        class: "button profile__actions-item profile__button profile__button_error",
                    },
                }),
            ],
            events: {
                submit: (e) => this.handleSubmit(e),
            },
        });
    }

    handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        const inputs = [
            loginInput,
            passwordInput,
            phoneInput,
            emailInput,
            nameInput,
            surnameInput,
        ];

        const result: Record<string, string> = {};
        let isAllCheckSuccess = true;

        inputs.forEach((input) => {
            const el = input.getContent().querySelector("input");
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

        isAllCheckSuccess
            ? console.log(result)
            : console.log("Validation error");
    }

    render() {
        return this.compile(template, this._props);
    }
}
