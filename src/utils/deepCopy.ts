export function deepCopy(arg: unknown) {
    if (typeof arg !== "object" || arg === null || arg === undefined) {
        return arg;
    }

    const copy = Array.isArray(arg) ? [] : {};

    Object.keys(arg).forEach((key) => {
        (copy as { [key: string]: unknown })[key] = deepCopy(
            (arg as { [key: string]: unknown })[key],
        );
    });

    return copy;
}
