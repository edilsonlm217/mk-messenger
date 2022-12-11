import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

interface ComponentProps {
    initialTime: number
}

const Timer: React.FC<ComponentProps> = (props) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const getTime = () => {
        const clickTime = props.initialTime;
        const deadline = clickTime + 120000;
        const time = deadline - Date.now();

        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {minutes >= 0 &&
                <div className={styles.timer}>
                    Tente novamente em: <span>{minutes}:{seconds.toLocaleString("pt-BR", { minimumIntegerDigits: 2 })}</span>
                </div>
            }
        </>
    );
}

export default Timer;