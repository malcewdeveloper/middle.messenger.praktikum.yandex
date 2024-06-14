import { Block, type BlockProps } from "../../core/Block";
import { Avatar } from "../../ui";
import template from "./TopPanel.hbs?raw";

interface ITopPanelProps extends BlockProps {
    avatar?: Block;
    title: string;
    attributes: Record<string, string>;
}

export default class TopPanel extends Block {
    constructor(props: ITopPanelProps) {
        super({
            ...props,
            avatar: new Avatar({
                attributes: {
                    class: "avatar",
                    "data-size": "small",
                },
            }),
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
