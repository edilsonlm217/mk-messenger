import React from 'react';

import styles from './styles.module.scss';

interface ComponentProps {
    children: JSX.Element
}

const BigWhiteCard: React.FC<ComponentProps> = (props) => {
    return (
        <div id="big-white-card" className={styles.container}>
            {props.children}
        </div>
    );
}

export default BigWhiteCard;