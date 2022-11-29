import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LocalStorage from '../../services/LocalStorage';

import styles from './styles.module.scss';

const Qrcode: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if (!LocalStorage.sessionNameExists()) {
            router.push("/login");
        }
    }, []);

    return (
        <h1>QRCode works!</h1>
    );
}

export default Qrcode;