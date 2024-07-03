import { Block, type BlockProps } from "../../core/Block";
import { Button, Form } from "../../ui";
import Input from "../../components/Input/Input";
import { TypePattern, validator } from "../../utils";
import { register } from "../../services";
import template from "./RegisterPage.hbs?raw";
import { connect } from "../../core";
import { IRegisterData } from "../../interfaces";

interface IRegisterPageProps extends BlockProps {}

const loginInput: Input = new Input({
    type: "text",
    placeholder: "ivanivanov",
    name: "login",
    label: "Логин",
    events: {
        blur: (e) => loginInput.handleBlur(e, "login"),
    },
});

const passwordInput: Input = new Input({
    type: "password",
    placeholder: "*******",
    name: "password",
    label: "Пароль",
    events: {
        blur: (e) => passwordInput.handleBlur(e, "password"),
    },
});

const phoneInput: Input = new Input({
    type: "phone",
    placeholder: "+79099673030",
    name: "phone",
    label: "Телефон",
    events: {
        blur: (e) => phoneInput.handleBlur(e, "phone"),
    },
});

const emailInput: Input = new Input({
    type: "email",
    placeholder: "pochta@yandex.ru",
    name: "email",
    label: "Почта",
    events: {
        blur: (e) => emailInput.handleBlur(e, "email"),
    },
});

const nameInput: Input = new Input({
    type: "text",
    placeholder: "Иван",
    name: "first_name",
    label: "Имя",
    events: {
        blur: (e) => nameInput.handleBlur(e, "first_name"),
    },
});

const surnameInput: Input = new Input({
    type: "text",
    placeholder: "Иванов",
    name: "second_name",
    label: "Фамилия",
    events: {
        blur: (e) => surnameInput.handleBlur(e, "second_name"),
    },
});

class _RegisterPage extends Block {
    constructor(props: IRegisterPageProps) {
        super({
            ...props,
            form: new Form({
                title: "Регистарция",
                children: [
                    emailInput,
                    loginInput,
                    nameInput,
                    surnameInput,
                    phoneInput,
                    passwordInput,
                ],
                actions: [
                    new Button({
                        text: "Зарегистрироваться",
                        attributes: {
                            class: "button",
                            type: "submit",
                        },
                    }),
                ],
            }),
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

        if (!isAllCheckSuccess) {
            return;
        }

        register(result as unknown as IRegisterData).catch((err) =>
            this.setProps({
                error: true,
                errorMessage: err.message,
            }),
        );
    }

    render() {
        return this.compile(template, this._props);
    }
}

const RegisterPage = connect((state) => ({ user: state.user }))(
    _RegisterPage as typeof Block,
);

export default RegisterPage;
