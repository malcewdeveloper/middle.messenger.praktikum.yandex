import { Block, type BlockProps } from "../../core/Block";
import template from "./PreviewPage.hbs?raw";

interface IPreviewPageProps extends BlockProps {}

export default class PreviewPage extends Block {
    constructor(props: IPreviewPageProps) {
        super(props);
    }

    render() {
        return this.compile(template, this._props);
    }
}
