import formTemplate from './Form.hbs';
import styles from './Form.module.scss';


export default function Form(props) {
    const {
        title,
        fields,
    } = props;

    const settings = {
        root: {
            className: styles.root,
        },
        title: {
            className: styles.title,
            text: title
        },
        fields
    }

    return formTemplate({ title, settings });
}