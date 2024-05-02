import Avatar from '../../assets/avatar.jpg';
import Pin from '../../assets/pin.svg';
import ArrowRight from '../../assets/arrow-right.svg';

export const ChatPageContext = {
    chats: [
        {            
            avatar: {
                size: 'middle'
            },
            title: 'Максим',
            preview: 'Друзья, у меня для вас особенный выпуск новостей! Сегодня я успешно выполнил первый спринт в Яндекс Практикуме',
            date: '12:00',
            badge: 10,
            lastMessageMe: true
        },
        {            
            avatar: {
                size: 'middle'
            },
            title: 'Максим',
            preview: 'Друзья, у меня для вас особенный выпуск новостей! Сегодня я успешно выполнил первый спринт в Яндекс Практикуме',
            date: '12 Апр 2024',
            badge: 10,
            lastMessageMe: true
        },
        {            
            avatar: {
                size: 'middle'
            },
            title: 'Максим',
            preview: 'Друзья, у меня для вас особенный выпуск новостей! Сегодня я успешно выполнил первый спринт в Яндекс Практикуме',
            date: '12 Апр 2024',
            badge: 10,
            lastMessageMe: true
        },
    ],
    // messages: [
    //     {
    //         type: 'text',
    //         content: {
    //             text: 'Друзья, у меня для вас особенный выпуск новостей! Сегодня я успешно выполнил первый спринт в Яндекс Практикуме',
    //         },
    //         time: '11:50',
    //         isMessageMe: false
    //     },
    //     {
    //         type: 'text',
    //         content: {
    //             image: Avatar
    //         },
    //         time: '11:56',
    //         isMessageMe: false
    //     },
    //     {
    //         type: 'text',
    //         content: {
    //             text: 'Молодец! Так держать!'
    //         },
    //         time: '12:00',
    //         isRead: true,
    //         isMessageMe: true
    //     }
    // ],
    avatar: {
        size: 'small',
        image: {
            src: Avatar
        }
    },
    buttonStart: {
        className: 'bottom-panel__button bottom-panel__button-start',
        iconStart: Pin
    },
    buttonEnd: {
        className: 'bottom-panel__button buttom-panel__button-end',
        iconStart: ArrowRight
    },
    title: 'Максим'
}
