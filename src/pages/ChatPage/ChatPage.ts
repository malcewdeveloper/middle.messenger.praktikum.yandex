import { Block, type BlockProps } from "../../core/Block";
import { connect } from "../../core";
import { ChatPreview, ChatsPanel } from "../../modules";
import template from "./ChatPage.hbs?raw";

interface IChatPageProps extends BlockProps {}

class _ChatPage extends Block {
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

const ChatPage = connect((state) => ({
    activeChat: state.activeChat,
}))(_ChatPage as typeof Block);

export default ChatPage;
