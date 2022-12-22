import { IdentificationCard, Power } from 'phosphor-react';
import React, { useLayoutEffect, useState } from 'react';
import LocalStorage from '../../services/LocalStorage';
import Heading from '../Heading';
import Text from '../Text';
import axios from "axios";

import styles from './styles.module.scss';

const SessionCard: React.FC = () => {
    const [sessionName, setSessionName] = useState<string | null>(null);

    useLayoutEffect(() => {
        function getSesession() {
            const sessionName = LocalStorage.getItem("client-session-name");
            setSessionName(sessionName);
        }
        getSesession();
    }, []);

    async function handleLogout(): Promise<void> {
        const options = {
            method: 'DELETE',
            url: `http://localhost:3333/session/${sessionName}`
        };
        try {
            await axios(options);
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                {sessionName &&
                    <Text className={styles.text} body>{sessionName}</Text>
                }
                {/* <div className={styles.sessionName}>
                    <IdentificationCard size={22} weight="thin" />
                    <Text className={styles.text} body>updata-telecom</Text>
                </div> */}
                {/* <Text className={styles.text} body>
                    Sessão iniciada em 09/12/2022 as 10:20
                </Text> */}
            </div>

            <Power
                size={22} color="#dc3232"
                className={styles.icon}
                onClick={handleLogout}
            />
        </div>
    );
}

export default SessionCard;