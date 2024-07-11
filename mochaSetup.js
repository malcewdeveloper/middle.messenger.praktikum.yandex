import { JSDOM } from "jsdom";

const jsdom = new JSDOM("<body></body>", {
    url: "https://example.org/",
});

// eslint-disable-next-line no-undef
global.window = jsdom.window;
// eslint-disable-next-line no-undef
global.document = jsdom.window.document;
// eslint-disable-next-line no-undef
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
// eslint-disable-next-line no-undef
global.scroll = (number1, number2) => {
    // eslint-disable-next-line no-undef
    console.log(number1, number2);
};
// eslint-disable-next-line no-undef
global.MouseEvent = jsdom.window.MouseEvent;
// eslint-disable-next-line no-undef
global.FormData = jsdom.window.FormData;
