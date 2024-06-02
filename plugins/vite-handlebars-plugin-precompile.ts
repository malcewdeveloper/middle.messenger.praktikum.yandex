import Handlebars from "handlebars";

export default function handlebars() {
    const fileRefexp = /\.hbs$|\.handlebars$/;

    return {
        name: "vite-handlebars-plugin-precompile",
        transform(src, id) {
            if (!fileRefexp.test(id)) {
                return;
            }

            const code = `
                import Handlebars from 'handlebars/runtime';

                export default Handlebars.template(${Handlebars.precompile(src)});
            `;

            return {
                code,
            };
        },
    };
}
