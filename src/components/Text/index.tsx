import React from 'react';

import styles from './styles.module.scss';

interface TextProps {
    children: React.ReactNode;
    caption?: boolean;
    body?: boolean;
}

const Text: React.FC<TextProps & React.HTMLProps<HTMLParagraphElement>> = (props) => {
    if (props.caption) {
        return (
            <p className={`${styles.text} ${styles.caption} ${props.className}`}>
                {props.children}
            </p>
        );
    } else {
        return (
            <p className={`${styles.text} ${styles.body} ${props.className}`}>
                {props.children}
            </p>
        );
    }
}

export default Text;