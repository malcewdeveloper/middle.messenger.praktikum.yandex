import { connect } from "../../core";
import { Block, type BlockProps } from "../../core/Block";
import { Avatar, Modal } from "../../ui";
import AddUser from "../AddUser/AddUser";
import DeleteUser from "../DeleteUser/DeleteUser";
import Dropdown from "../Dropdown/Dropdown";
import template from "./TopPanel.hbs?raw";

interface ITopPanelProps extends BlockProps {
    avatar?: Block;
    title: string;
    attributes: Record<string, string>;
}

class _TopPanel extends Block {
    constructor(props: ITopPanelProps) {
        const addUserModal: Modal = new Modal({
            title: "Добавить пользователя",
            children: [
                new AddUser({
                    onSubmit: () => addUserModal.hide(),
                }),
            ],
        });

        const deleteUserModal: Modal = new Modal({
            title: "Удалить пользователя",
            children: [
                new DeleteUser({
                    onSubmit: () => deleteUserModal.hide(),
                }),
            ],
        });

        super({
            ...props,
            avatar: new Avatar({
                attributes: {
                    class: "avatar",
                    "data-size": "small",
                },
            }),
            Dropdown: new Dropdown({
                items: [
                    {
                        title: "Добавить пользователя",
                        onClick: () => addUserModal.show(),
                    },
                    {
                        title: "Удалить пользователя",
                        onClick: () => deleteUserModal.show(),
                    },
                ],
            }),
            AddModal: addUserModal,
            DeleteModal: deleteUserModal,
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}

const TopPanel = connect((state) => ({
    title: state.activeChat ? state.activeChat.title : "Untitled",
}))(_TopPanel as typeof Block);

export default TopPanel;
