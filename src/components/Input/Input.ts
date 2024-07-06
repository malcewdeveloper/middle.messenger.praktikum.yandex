import { Block } from "../../core";
import { BaseInput, IBaseInputProps } from "../../ui";
import template from "./Input.hbs?raw";
import { TypePattern, validator } from "../../utils";

interface IInputProps extends IBaseInputProps {
    label?: string;
    error?: boolean;
    errorMessage?: string;
}

export default class Input extends Block {
    constructor(props: IInputProps) {
        super({
            ...props,
            Input: new BaseInput({ ...props }),
            attributes: {
                class: `${props.error ? "input error" : "input"}`,
            },
        });
    }

    handleBlur(e: FocusEvent, type: TypePattern) {
        const el = e.target as HTMLInputElement;
        const { isValid, message } = validator(el.value, type);

        this.setProps({
            error: !isValid,
            errorMessage: isValid ? "" : message,
        });
    }

    render() {
        return this.compile(template, this._props);
    }
}
