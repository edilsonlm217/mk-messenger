import React from 'react';
import BigWhiteCard from '../BigWhiteCard';
import Heading from '../Heading';
import Text from '../Text';

import styles from './styles.module.scss';

interface ComponentProps {
    qrcode: string
}

const QrCode: React.FC<ComponentProps> = (props) => {
    return (
        <div id="qrcode" className={styles.pageContainer}>
            <BigWhiteCard
                id="big-white-card"
                className={styles.bigWhiteCard}
                useFooter
            >
                <Heading fontSize='xxs'>Inicializando Sessão</Heading>

                <Text className={styles.text}>
                    Abra o Whatsapp e aponte a camera do seu celular para realizar a captura do código
                </Text>

                <div className={styles.qrCodeContainer}>
                    <img src={props.qrcode} alt="qrCode" />
                </div>
            </BigWhiteCard>
        </div>
    );
}

export default QrCode;