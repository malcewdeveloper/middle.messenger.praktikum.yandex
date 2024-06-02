import { Block, type BlockProps } from "../../core/Block";
import { ChatPreview, ChatsPanel } from "../../modules";
import template from "./ChatPage.hbs?raw";

interface IChatPageProps extends BlockProps {}

export default class ChatPage extends Block {
    constructor(props: IChatPageProps) {
        super({
            ...props,
            children: [new ChatsPanel({}), new ChatPreview({})],
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
