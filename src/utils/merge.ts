// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PlainObject<T = any> = { [key in string]: T };

export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
    for (const p in rhs) {
        // eslint-disable-next-line no-prototype-builtins
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as PlainObject, rhs[p] as PlainObject);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}
