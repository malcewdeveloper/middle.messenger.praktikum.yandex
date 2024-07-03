import { merge } from "./merge";

export function set(
    object: PlainObject,
    path: string,
    value: unknown,
): PlainObject {
    if (typeof object !== "object" || object === null) return object;
    if (typeof path !== "string") {
        throw new Error(
            `Type error: path parametr must be type 'string', but have ${typeof path}.`,
        );
    }
    if (!path) {
        throw new Error(`Path parametr can't be empty.`);
    }

    const structure = path
        .split(".")
        .reduceRight((result, part) => ({ [part]: result }), value);

    const res = merge(object, structure as PlainObject);
    return res;
}
