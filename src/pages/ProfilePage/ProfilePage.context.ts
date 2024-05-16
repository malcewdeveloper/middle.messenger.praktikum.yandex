export const ProfilePageContext = {
    avatar: {
        size: 'big',
        image: {
            src: '/src/assets/avatar.jpg',
            alt: 'Фотография пользователя'
        }
    },
    email: 'pochta@yandex.ru',
    login: 'ivanivanov',
    name: 'Максим',
    surname: 'Мальцев',
    chatName: 'Максим',
    number: '+7 (909) 967 30 30',
    actions: [
        {
            text: 'Изменить данные',
            className: 'profile__button'
        },
        {
            text: 'Изменить пароль',
            className: 'profile__button'
        },
        {
            text: 'Выйти',
            className: 'profile__button profile__button_error'
        }
    ]
}
