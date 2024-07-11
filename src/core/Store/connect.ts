// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlainObject<T = any> = { [key in string]: T };

import { default as store, StoreEvents } from "./Store";
import { Block, type BlockProps } from "../Block";
import { State } from "./Store";
import { isEqual } from "../../utils";

export function connect(mapStateToProps: (state: State) => BlockProps) {
    return function wrapper(Component: typeof Block) {
        return class extends Component {
            constructor(props: BlockProps) {
                const state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                store.on(StoreEvents.UPDATED, () => {
                    const newState = mapStateToProps(store.getState());

                    if (
                        !isEqual(state as PlainObject, newState as PlainObject)
                    ) {
                        this.setProps(newState);
                    }
                });
            }
        };
    };
}
