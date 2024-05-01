import * as Components from './components';
import * as UI from './ui';
import * as Modules from './modules';
import * as Pages from './pages';
import Handlebars from 'handlebars';
import './global.scss';


const pages = {
    '/': {
        page: Pages.PreviewPage,
        context: {}
    },
    '/main': {
        page: Pages.ChatPage,
        context: Pages.ChatPageContext
    },
    '/register': {
        page: Pages.RegisterPage,
        context: Pages.RegisterPageContext
    },
    '/login': {
        page: Pages.LoginPage,
        context: Pages.LoginPageContext
    },
    '/profile': {
        page: Pages.ProfilePage,
        context: Pages.ProfilePageContext
    },
    '/not-found': {
        page: Pages.NotFound,
        context: {}
    },
    '/error': {
        page: Pages.Error,
        context: Pages.ErrorContext
    }
}

const navigate = () => {
    if(pages[window.location.pathname]) {
        const {page, context} = pages[window.location.pathname];

        return Handlebars.compile(page)(context);
    } else {
        return Handlebars.compile(pages['/not-found'].page)();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');

    Object.entries({...Components, ...UI, ...Modules}).forEach(([name, partial]) => {
        Handlebars.registerPartial(name, partial);
    });

    root.innerHTML = navigate();
});