import inputTemplate from './Input.hbs';
import styles from './Input.module.scss';
import clsx from '../../utils/clsx';


export default function Input(props = {}) {
    const {
        type = 'text',
        id,
        name,
        value,
        label,
        className
    } = props;

    const settings = {
        root: {
            className: clsx([styles.root, className]),
        },
        label: {
            className: styles.label,
            label: label,
            for: id
        },
        input: {
            id: id,
            className: styles.input,
            value,
            name,
            type
        }
    }

    return inputTemplate({settings});
}