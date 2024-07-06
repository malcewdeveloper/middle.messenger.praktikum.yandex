import { Block, type BlockProps } from "../../core/Block";
import { Avatar, BaseInput, Button, Modal } from "../../ui";
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

const LoginInput = connect((state) => ({
    label: "Логин",
    Input: new BaseInput({
        type: "text",
        value: state.user?.login,
        name: "login",
        placeholder: "ivanivanov",
    }),
}))(Input as typeof Block);

const PhoneInput = connect((state) => ({
    label: "Телефон",
    Input: new BaseInput({
        type: "phone",
        value: state.user?.phone,
        placeholder: "+7909XXXXXXX",
        name: "phone",
    }),
}))(Input as typeof Block);

const EmailInput = connect((state) => ({
    label: "Почта",
    Input: new BaseInput({
        type: "email",
        value: state.user?.email,
        placeholder: "pochta@yandex.ru",
        name: "email",
    }),
}))(Input as typeof Block);

const NameInput = connect((state) => ({
    label: "Имя",
    Input: new BaseInput({
        type: "text",
        value: state.user?.first_name,
        placeholder: "Иван",
        name: "first_name",
    }),
}))(Input as typeof Block);

const SurnameInput = connect((state) => ({
    label: "Фамилия",
    Input: new BaseInput({
        type: "text",
        value: state.user?.second_name,
        placeholder: "Иванов",
        name: "second_name",
    }),
}))(Input as typeof Block);

const inputs = [
    new LoginInput({}),
    new PhoneInput({}),
    new EmailInput({}),
    new NameInput({}),
    new SurnameInput({}),
];

class _ProfilePage extends Block {
    constructor(props: IProfilePageProps) {
        const modal: Modal = new Modal({
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
