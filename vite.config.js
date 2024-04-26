import { defineConfig } from "vite";
import handlebars from "./plugins/vite-handlebars-plugin-precompile";


export default defineConfig({
    plugins: [
        handlebars()
    ],
    server: {
        port: 3000
    }
});