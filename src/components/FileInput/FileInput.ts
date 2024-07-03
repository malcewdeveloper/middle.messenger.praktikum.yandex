import { Block, type BlockProps } from "../../core";
import template from "./FileInput.hbs?raw";

interface IFileInputProps extends BlockProps {
    onChange: (file: File) => void;
}

export default class FileInput extends Block<IFileInputProps> {
    constructor(props: IFileInputProps) {
        super({
            ...props,
            events: {
                change: (event) => this.onChange(event),
            },
        });
    }

    onChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            this._props.onChange(file);
        }
    }

    render() {
        return this.compile(template, this._props);
    }
}
