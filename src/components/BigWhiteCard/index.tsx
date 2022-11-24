import React from 'react';

import styles from './styles.module.scss';

interface ComponentProps {
    children: JSX.Element | JSX.Element[]
}

const BigWhiteCard: React.FC<ComponentProps & React.HTMLProps<HTMLDivElement>> = (props) => {
    return (
        <div id={props.id} className={`${styles.container} ${props.className}`}>
            {props.children}
        </div>
    );
}

export default BigWhiteCard;