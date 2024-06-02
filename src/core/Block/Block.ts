import Handlebars from "handlebars";
import { EventBus } from "../EventBus";
import { v4 as uuidv4 } from "uuid";

type Events = {
    [key in keyof HTMLElementEventMap]?: (
        event: HTMLElementEventMap[key],
    ) => void;
};

export type BlockProps = {
    [key: string]: unknown;
    events?: Events;
};

export default class Block<T extends BlockProps = BlockProps> {
    static EVENTS = {
        INIT: "init",
        CDM: "flow:component-did-mount",
        CDU: "flow:component-did-update",
        RENDER: "flow:render",
    };

    readonly _props: T;
    readonly children: Record<string, Block> = {};
    private readonly _lists: Record<string, unknown[]> = {};
    private readonly _id: string = uuidv4();
    private _element: HTMLElement | null = null;
    private _eventBus: EventBus;
    private _setUpdate: boolean = false;

    constructor(propsAndChildren: T) {
        const { children, props, lists } = this._getChildren(propsAndChildren);
        this._eventBus = new EventBus();
        this._props = this._makeProxyProps({
            ...props,
            __id: this._id,
        }) as unknown as T;
        this.children = this._makeProxyProps({ ...children });
        this._lists = this._makeProxyProps({ ...lists });
        this._registerEvents(this._eventBus);
        this._eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents() {
        const { events = {} } = this._props;
        if (events) {
            (Object.keys(events) as (keyof HTMLElementEventMap)[]).forEach(
                (eventName) => {
                    if (this._element) {
                        this._element.addEventListener(
                            eventName,
                            events[eventName] as EventListener,
                        );
                    }
                },
            );
        }
    }

    private _removeEvents() {
        const { events = {} } = this._props;
        if (events) {
            (Object.keys(events) as (keyof HTMLElementEventMap)[]).forEach(
                (eventName) => {
                    this._element?.removeEventListener(
                        eventName,
                        events[eventName] as EventListener,
                    );
                },
            );
        }
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.RENDER, this._render.bind(this));
    }

    private _createDocumentElement(tagName = "div") {
        return document.createElement(tagName);
    }

    private _getChildren(propsAndChildren: T) {
        const children: Record<string, Block> = {};
        const props: BlockProps = {};
        const lists: Record<string, unknown[]> = {};

        Object.keys(propsAndChildren).forEach((key) => {
            if (propsAndChildren[key] instanceof Block) {
                children[key] = propsAndChildren[key];
            } else if (Array.isArray(propsAndChildren[key])) {
                lists[key] = propsAndChildren[key];
            } else {
                props[key] = propsAndChildren[key];
            }
        });

        return {
            children,
            props,
            lists,
        };
    }

    private _setAttributes() {
        const attributes = this._props.attributes as
            | Record<string, string>
            | undefined;
        if (attributes) {
            Object.keys(attributes).forEach((attribute) => {
                this.element?.setAttribute(attribute, attributes[attribute]);
            });
        }
    }

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this.children).forEach((child) => {
            child.dispatchComponentDidMount();
        });
    }

    private _componentDidUpdate(oldProps: T, newProps: T) {
        const isRender = this.componentDidUpdate(oldProps, newProps);
        if (isRender) {
            this._eventBus.emit(Block.EVENTS.RENDER);
        }
    }

    private _makeProxyProps<T extends object>(props: T): T {
        return new Proxy(props, {
            get: (target, prop: string) => {
                const value = target[prop as keyof T];
                return typeof value === "function" ? value.bind(self) : value;
            },
            set: (target, prop: string, value) => {
                if (target[prop as keyof T] !== value) {
                    target[prop as keyof T] = value;
                    this._setUpdate = true;
                }
                return true;
            },
        });
    }

    private _render() {
        const block = this.render() as unknown as DocumentFragment;
        const newElement = block.firstElementChild as HTMLElement;
        this._removeEvents();

        if (this.element) {
            this.element.replaceWith(newElement);
            this._element = newElement;
            this._setAttributes();
            this._addEvents();
        }
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this._eventBus.emit(Block.EVENTS.CDM);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    componentDidUpdate(oldProps: T, newProps: T) {
        return true;
    }

    setProps(newProps: T) {
        if (!newProps) {
            return;
        }

        this._setUpdate = false;
        const oldProps = { ...this._props };

        const { children, props, lists } = this._getChildren(newProps);

        if (Object.values(children).length) {
            Object.assign(this.children, children);
        }

        if (Object.values(props).length) {
            Object.assign(this._props, props);
        }

        if (Object.values(lists).length) {
            Object.assign(this._lists, props);
        }

        if (this._setUpdate) {
            this._eventBus.emit(Block.EVENTS.CDU, oldProps, this._props);
            this._setUpdate = false;
        }
    }

    getContent(): HTMLElement {
        return this.element as HTMLElement;
    }

    compile(template: string, props: T) {
        const propsAndStubs = { ...(props as BlockProps) };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this._lists).forEach(([key]) => {
            propsAndStubs[key] = `<div data-id="__l_${key}"></div>`;
        });

        const fragment = this._createDocumentElement(
            "template",
        ) as HTMLTemplateElement;
        fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(
                `[data-id="${child._id}"]`,
            );

            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        Object.entries(this._lists).forEach(([key, child]) => {
            const stub = fragment.content.querySelector(
                `[data-id="__l_${key}"]`,
            );

            if (!stub) return;

            const listContent = this._createDocumentElement(
                "template",
            ) as HTMLTemplateElement;

            child.forEach((item) => {
                if (item instanceof Block) {
                    listContent.content.append(item.getContent());
                } else {
                    listContent.content.append(`${item}`);
                }
            });

            stub.replaceWith(listContent.content);
        });

        return fragment.content;
    }

    render() {}

    init() {
        this._element = this._createDocumentElement();
        this._eventBus.emit(Block.EVENTS.RENDER);
    }

    show() {}

    hide() {}

    public get element() {
        return this._element;
    }
}

// 1. Полностью закончить компонент блока
// 2. В связи с тем, что у нас больше нет эелмента обертки - заменить верску всех компонентов
// 3. Сделать валидацию полей
// 4. Сделать отправку формы
