# yandex.messenger

[![Netlify Status](https://api.netlify.com/api/v1/badges/0c2e7ef7-b1e7-4605-9b49-e46133c4c1b8/deploy-status)](https://app.netlify.com/sites/ya-messenger-praktikum/deploys)

Добро пожаловать в мессенджер!

Этот проект создан в рамках обучения в Яндекс Практикуме и служит примером реализации основных концепций веб-разработки. Наш мессенджер призван продемонстрировать работу с базой данных, механизмы аутентификации пользователей и обработку взаимодействия между ними без использования сторонних библиотек React, Vue, Angular и др.

## Ссылки

- [Главная страница](https://ya-messenger-praktikum.netlify.app/)
- [Страница чатов и ленты переписки](https://ya-messenger-praktikum.netlify.app/main)
- [Профиль](https://ya-messenger-praktikum.netlify.app/profile)
- [Авторизация](https://ya-messenger-praktikum.netlify.app/login)
- [Регистрация](https://ya-messenger-praktikum.netlify.app/register)
- [404](https://ya-messenger-praktikum.netlify.app/not-found)
- [5**](https://ya-messenger-praktikum.netlify.app/error)

## Запуск проекта

Для запуска проекта вам потребуется Node.js и npm на вашем компьютере.

1. **Установка зависимостей**: Перед запуском убедитесь, что все зависимости проекта установлены. Выполните команду в корневой директории проекта:

```
    npm install
```

2. **Запуск сервера**: После установки зависимостей вы можете запустить сервер приложения.
   
### Для запуска сервера разработки:

```
    npm run dev
```

### Для сборки проекта и запуска production сервера:

```
    npm start
```

Эта команда запустит сервер на локальном хосте на порту 3000 (по умолчанию).

3. **Доступ к приложению**: После запуска сервера приложение будет доступно по следующему адресу в вашем браузере:

```
    http://localhost:3000
```

Откройте этот URL в вашем браузере, чтобы начать использовать мессенджер.

## Функциональности

- Регистрация новых пользователей
- Аутентификация существующих пользователей
- Обмен сообщениями между пользователями
- Профиль пользователя с возможностью изменения настроек

## Технологии

- **Frontend**: HTML, SCSS, JavaScript, TypeScript, Handlebars, Vite
- **Backend**: Node.js, Express.js

## Дизайн

Внешний вид мессенджера можно увидеть в Figma по [ссылке](https://www.figma.com/file/wMIiCW5uyGHtAwEZoDMgLf/ya-messenger-praktikum?type=design&node-id=0-1&mode=design&t=6PH6GTBKht9UEs7N-0)

На первое время был использован макет, который предоставил Яндекс Практикум, в дальнейшем внешний вид будет изменен.
