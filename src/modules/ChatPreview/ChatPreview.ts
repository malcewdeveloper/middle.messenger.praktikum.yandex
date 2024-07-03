import { BottomPanel, TopPanel } from "../../components";
import { Block, type BlockProps } from "../../core/Block";
import { Message } from "../../ui";
import { connect } from "../../core";
import template from "./ChatPreview.hbs?raw";

interface IChatPreviewProps extends BlockProps {}

class _ChatPreview extends Block {
    constructor(props: IChatPreviewProps) {
        super({
            ...props,
            topPanel: new TopPanel({
                attributes: {
                    class: "top-panel",
                },
            }),
            bottomPanel: new BottomPanel({}),
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}

const ChatPreview = connect((state) => ({
    user: state.user,
    messages: state.messages?.map(
        (message) =>
            new Message({
                content: {
                    text: message.content,
                    image: message.file ? message.file.path : null,
                },
                time: message.time,
                isRead: false,
                isMessageMe: true,
                attributes: {
                    class: `message ${state.user.id === message.user_id ? " message_me" : ""}`,
                },
            }),
    ),
}))(_ChatPreview as typeof Block);

export default ChatPreview;
