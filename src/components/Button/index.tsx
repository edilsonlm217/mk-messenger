import React from "react";

import styles from "./styles.module.scss";

interface ButtonProps {
    children: string
    primary?: boolean
    secondary?: boolean
}

const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = (props) => {
    if (props.primary || (!props.primary && !props.secondary)) {
        return (
            <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        );
    } else {
        return (
            <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={props.onClick}
            >
                {props.children}
            </button>
        );
    }
}

export default Button;