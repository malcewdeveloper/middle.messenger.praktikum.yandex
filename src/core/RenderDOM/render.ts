import { Block } from "../Block";

export function render(tag: string, element: Block) {
    const root = document.querySelector(tag);

    if (root) {
        root.appendChild(element.getContent());
    }
}
