import React from 'react';

import styles from './styles.module.scss';

interface ComponentProps {
    children: JSX.Element | JSX.Element[]
    useFooter?: boolean
}

const BigWhiteCard: React.FC<ComponentProps & React.HTMLProps<HTMLDivElement>> = (props) => {
    return (
        <div id={props.id} className={`${styles.container} ${props.className}`}>
            {props.children}
            {props.useFooter &&
                <div className={styles.footer}>
                    © 2022 MK-Edge. Todos os direitos reservados.
                </div>
            }

        </div>
    );
}

export default BigWhiteCard;