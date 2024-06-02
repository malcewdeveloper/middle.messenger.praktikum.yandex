export function clsx(classes: string[]): string {
    const result: string[] = [];

    classes.forEach((item) => {
        if (item) result.push(item);
    });

    return result.join(" ");
}
