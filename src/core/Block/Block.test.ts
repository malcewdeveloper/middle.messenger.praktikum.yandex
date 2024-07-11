import { expect, use } from "chai";
import sinonChai from "sinon-chai";
import { createSandbox } from "sinon";
import { afterEach } from "mocha";
import Block, { type BlockProps } from "./Block";

describe("Block", () => {
    use(sinonChai);
    const sandbox = createSandbox();
    let app: Element;

    class TestBlock extends Block {
        constructor(props: BlockProps) {
            super({
                ...props,
                attributes: {
                    id: "test",
                },
            });
        }

        render() {
            return this.compile("<div>{{{text}}}</div>", this._props);
        }
    }

    class TestParentBlock extends Block {
        constructor(props: BlockProps) {
            super({
                ...props,
                attributes: {
                    id: "test-parent",
                },
            });
        }

        render() {
            return this.compile("<div>{{{child}}}</div>", this._props);
        }
    }

    before(() => {
        app = document.body;
    });

    afterEach(() => {
        app.innerHTML = "";
        sandbox.restore();
    });

    it("should render element with text prop inside", () => {
        const text = "Text";
        const testBlock = new TestBlock({
            text,
        });

        app.appendChild(testBlock.getContent());

        const resultText = app.querySelector("#test")?.innerHTML;

        return expect(resultText).to.be.eq(text);
    });

    it("should render element with new text after prop change", () => {
        const text = "Text";
        const secondText = "New text";

        const testBlock = new TestBlock({
            text,
        });

        app.appendChild(testBlock.getContent());

        testBlock.setProps({
            text: secondText,
        });

        const resultText = app.querySelector("#test")?.innerHTML;

        return expect(resultText).to.be.eq(secondText);
    });

    it("should render child element with text prop inside", () => {
        const text = "Text";

        const testBlock = new TestBlock({
            text,
        });

        const testParentBlock = new TestParentBlock({
            child: testBlock,
        });

        app.appendChild(testParentBlock.getContent());

        const parentElement = app.querySelector("#test-parent");

        const resultText = parentElement?.querySelector("#test")?.innerHTML;

        return expect(resultText).to.be.eq(text);
    });

    it("should render new child element after prop change", () => {
        const text = "Text";
        const secondText = "New text";

        const testBlockOne = new TestBlock({
            text,
        });

        const testBlockTwo = new TestBlock({
            text: secondText,
        });

        const testParentBlock = new TestParentBlock({
            child: testBlockOne,
        });

        app.appendChild(testParentBlock.getContent());

        testParentBlock.setProps({
            child: testBlockTwo,
        });

        const parentElement = app.querySelector("#test-parent");

        const resultText = parentElement?.querySelector("#test")?.innerHTML;

        return expect(resultText).to.eq(secondText);
    });

    it("should render children list", () => {
        const text = "Text";
        const secondText = "New text";

        const testBlockOne = new TestBlock({
            text,
        });
        const testBlockTwo = new TestBlock({
            text: secondText,
        });

        const testParentBlock = new TestParentBlock({
            child: [testBlockOne, testBlockTwo],
        });

        app.appendChild(testParentBlock.getContent());

        const parentElement = app.querySelector("#test-parent");

        const children = parentElement?.children;

        if (children) {
            const resultText = `${children[0].innerHTML} ${children[1].innerHTML}`;

            return expect(resultText)
                .to.contain(text)
                .and.to.contain(secondText);
        } else {
            throw new Error("should render children list");
        }
    });

    it("should set element attributes", () => {
        const text = "Text";

        const testBlock = new TestBlock({});

        app.appendChild(testBlock.getContent());

        testBlock.setProps({
            attributes: {
                id: "test",
                class: text,
            },
        });

        const blockElement = app.querySelector("#test");

        const resultText = blockElement?.getAttribute("class");

        return expect(resultText).to.contain(text);
    });
});
