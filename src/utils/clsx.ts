export default function clsx(classes: string[]): string {
    const result = new Array();

    classes.forEach((item) => {
        if(item) result.push(item);
    });

    return result.join(' ');
}
