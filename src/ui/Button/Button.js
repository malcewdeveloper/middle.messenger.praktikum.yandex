import clsx from '../../utils/clsx';
import buttonTemplate from './Button.hbs';
import styles from './Button.module.scss';


export default function Button(props = {}) {
    const {
        className,
        text = ''
    } = props;

    const classes = clsx([
        styles.root && styles.root,
        className && className
    ]);

    return buttonTemplate({ className: classes, text });
}