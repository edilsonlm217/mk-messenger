import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LocalStorage from '../../services/LocalStorage';

import styles from './styles.module.scss';

const Qrcode: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if (!sessionNameExists()) {
            router.push("/login");
        }
    }, []);

    function sessionNameExists(): boolean {
        return LocalStorage.getItem("user-session-name") ? true : false;
    }

    return (
        <h1>QRCode works!</h1>
    );
}

export default Qrcode;