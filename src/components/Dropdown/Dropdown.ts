import { Block, type BlockProps } from "../../core";
import { Button } from "../../ui/Button";
import template from "./Dropdown.hbs?raw";

interface IDropdownProps extends BlockProps {
    items: IDropdownItemProps[];
}

export default class Dropdown extends Block {
    constructor(props: IDropdownProps) {
        super({
            ...props,
            Button: new Button({
                attributes: {
                    class: "dropdown__button",
                },
                events: {
                    click: () => this.toggle(true),
                },
            }),
            items: props.items.map(
                (item) =>
                    new DropdownMenuItem({
                        title: item.title,
                        events: {
                            click: () => {
                                if (item.onClick) {
                                    item.onClick();
                                }

                                this.toggle(false);
                            },
                        },
                    }),
            ),
        });

        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(event: MouseEvent) {
        const tooltip = this.getContent();

        if (!tooltip.contains(event.target as Node)) {
            this.toggle(false);
        }
    }

    toggle(isOpen: boolean) {
        this.setProps({ isOpen });

        if (isOpen) {
            document.addEventListener("mousedown", this.handleClickOutside);
        } else {
            document.removeEventListener("mousedown", this.handleClickOutside);
        }
    }

    render() {
        return this.compile(template, this._props);
    }
}

interface IDropdownItemProps extends BlockProps {
    title: string;
    onClick?: () => void;
}

class DropdownMenuItem extends Block {
    constructor(props: IDropdownItemProps) {
        super({ ...props });
    }

    render() {
        return this.compile(
            `<li class="dropdown__item">${this._props.title}</li>`,
            this._props,
        );
    }
}
