import { Block, type BlockProps } from "../../core/Block";
import { Avatar, Button, Modal } from "../../ui";
import { FileInput, Input, UpdatePassword } from "../../components";
import { connect } from "../../core";
import { TypePattern, validator } from "../../utils";
import { changeAvatar, logout, updateProfile } from "../../services";
import { IUser } from "../../interfaces";
import template from "./ProfilePage.hbs?raw";

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

const loginInput: Input = new Input({
    type: "text",
    placeholder: "ivanovivanov",
    name: "login",
    label: "Логин",
    events: {
        blur: (e) => loginInput.handleBlur(e, "login"),
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

const inputs = [loginInput, phoneInput, emailInput, nameInput, surnameInput];

class _ProfilePage extends Block {
    constructor(props: IProfilePageProps) {
        const modal = new Modal({
            title: "Замена пароля",
            children: [
                new UpdatePassword({
                    onSubmit: () => modal.hide(),
                }),
            ],
        });

        const fileInput = new FileInput({
            onChange: (file) => this.handleFileChange(file),
        });

        super({
            ...props,
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
                    events: {
                        click: () => {
                            modal.show();
                        },
                    },
                }),
                new Button({
                    text: "Выйти",
                    attributes: {
                        class: "button profile__actions-item profile__button profile__button_error",
                    },
                    events: {
                        click: async () => {
                            await logout();
                        },
                    },
                }),
                modal,
            ],
            Button: new Button({
                text: "Поменять аватар",
                attributes: {
                    class: "profile__overlay-text",
                },
                events: {
                    click: () => fileInput.getContent().click(),
                },
            }),
            Input: fileInput,
            events: {
                submit: (e) => this.handleSubmit(e),
            },
        });
    }

    async handleFileChange(file: File) {
        await changeAvatar(file);
    }

    async handleSubmit(e: SubmitEvent) {
        e.preventDefault();

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
            ? await updateProfile(result as unknown as IUser)
            : console.log("Validation error");
    }

    render() {
        return this.compile(template, this._props);
    }
}

const ProfilePage = connect((state) => ({
    user: state.user,
    avatar: new Avatar({
        image: {
            src: `https://ya-praktikum.tech/api/v2/resources/${state.user?.avatar}`,
            alt: "Аватар",
        },
        attributes: {
            class: "avatar",
            "data-size": "big",
        },
    }),
    name: `${state.user?.first_name} ${state.user?.second_name}`,
}))(_ProfilePage as typeof Block);

export default ProfilePage;
