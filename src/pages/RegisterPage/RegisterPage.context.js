export const RegisterPageContext = {
    title: 'Регистрация',
    inputs: [
        {  
            type: 'email',
            placeholder: 'pochta@yandex.ru',
            name: 'email',
            label: 'Почта'
        },
        {
            type: 'text',
            placeholder: 'ivanivanov',
            name: 'login',
            label: 'Логин'
        },
        {
            type: 'text',
            placeholder: 'Иван',
            name: 'first_name',
            label: 'Имя'
        },
        {
            type: 'text',
            placeholder: 'Иванов',
            name: 'second_name',
            label: 'Фамилия'
        },
        {
            type: 'phone',
            placeholder: '+7 (909) 967 30 30',
            name: 'phone',
            label: 'Телефон'
        },
        {
            type: 'password',
            placeholder: '*******',
            name: 'password',
            label: 'Пароль'
        }

    ],
    button: {
        text: 'Зарегистрироваться'
    }
}