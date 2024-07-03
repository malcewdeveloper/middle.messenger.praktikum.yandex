declare module "*?raw" {
    const content: string;
    export default content;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type PlainObject<T = any> = { [key in string]: T };
