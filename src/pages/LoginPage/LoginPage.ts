import { Block, type BlockProps } from "../../core/Block";
import { Button, Form } from "../../ui";
import { Input } from "../../components";
import template from "./LoginPage.hbs?raw";
import { TypePattern, validator } from "../../utils";
import { connect } from "../../core";
import { login } from "../../services";
import { getChats } from "../../services";
import { ILoginData } from "../../interfaces";

interface ILoginPageProps extends BlockProps {}

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
    placeholder: "••••••••••••",
    name: "password",
    label: "Пароль",
    events: {
        blur: (e) => passwordInput.handleBlur(e, "password"),
    },
});

class _LoginPage extends Block {
    constructor(props: ILoginPageProps) {
        super({
            ...props,
            form: new Form({
                title: "Вход",
                children: [loginInput, passwordInput],
                actions: [
                    new Button({
                        text: "Войти",
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

        const inputs = [loginInput, passwordInput];

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
            throw Error("Validation error");
        }

        login(result as unknown as ILoginData)
            .then(async () => await getChats())
            .catch((err) =>
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

const LoginPage = connect((state) => ({ user: state.user }))(
    _LoginPage as typeof Block,
);

export default LoginPage;
