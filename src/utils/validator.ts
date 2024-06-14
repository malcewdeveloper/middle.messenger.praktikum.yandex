const PATTERNS = {
    login: {
        errorMessage: "Неверный логин!",
        exp: /^(?![_-])(?!.*[_-]{2})[a-zA-Z0-9_-]{3,20}(?<![_-])$/,
    },
    password: {
        errorMessage: "Неверный пароль!",
        exp: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    },
    email: {
        errorMessage: "Неверный формат почты!",
        exp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/,
    },
    phone: {
        errorMessage: "Неверный номер телефона!",
        exp: /^\+?\d{10,15}$/,
    },
    message: {
        errorMessage: "Поле не должно быть пустым!",
        exp: /.+/,
    },
    first_name: {
        errorMessage: "Имя начинается с большой буквы!",
        exp: /^[A-ZА-Я][a-zA-ZА-Яа-я-]*$/,
    },
    second_name: {
        errorMessage: "Фамилия начинается с большой буквы!",
        exp: /^[A-ZА-Я][a-zA-ZА-Яа-я-]*$/,
    },
};

export type TypePattern = keyof typeof PATTERNS;

export function validator(value: string, type: TypePattern) {
    let message = "";
    let isValid = true;

    if (!value && !type) {
        throw new Error("Значение и тип проверки не указаны");
    }

    isValid = PATTERNS[type].exp.test(value);

    if (!isValid) {
        message = PATTERNS[type].errorMessage;
    }

    return {
        message,
        isValid,
    };
}
