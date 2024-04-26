export default function clsx(classes) {
    const result = new Array();

    classes.forEach((item) => {
        if(item) result.push(item);
    });

    return result.join(' ');
}