import React from "react";
import ReactLoading from "react-loading";

import styles from "./styles.module.scss";

interface ButtonProps {
    children: string
    primary?: boolean
    secondary?: boolean
    isLoading?: boolean
}

const Button: React.FC<ButtonProps & React.HTMLProps<HTMLButtonElement>> = (props) => {
    function handleOnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        if (!props.isLoading && props.onClick) {
            props.onClick(e);
        }
    }
    if (props.primary || (!props.primary && !props.secondary)) {
        return (
            <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={handleOnClick}
            >
                {props.isLoading
                    ? <ReactLoading type="spin" height={15} width={15} color="#fff" />
                    : props.children
                }
            </button>
        );
    } else {
        return (
            <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={handleOnClick}
            >
                {props.isLoading
                    ? <ReactLoading type="spin" height={10} width={10} color="#fff" />
                    : props.children
                }
            </button>
        );
    }
}

export default Button;