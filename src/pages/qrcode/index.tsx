import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { io } from "socket.io-client";
import LocalStorage from '../../services/LocalStorage';

import Text from '../../components/Text';
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import BigWhiteCard from '../../components/BigWhiteCard';

import styles from './styles.module.scss';

const Qrcode: React.FC = () => {
    const router = useRouter();
    const [qrCode, setQRcode] = useState('');

    useEffect(() => {
        redirectIfSessionNameDoesNotExist();
        generateQrCode();
    }, []);

    function redirectIfSessionNameDoesNotExist(): void {
        if (!LocalStorage.sessionNameExists()) {
            router.push("/login");
        }
    }

    async function generateQrCode() {
        const sessionName = LocalStorage.getItem("client-session-name");

        const socket = io(`http://localhost:3333`, {
            query: {
                client: sessionName
            }
        });

        socket.on("successfully-connected", async () => {
            console.log("Conectado com sucesso");

            socket.on("qr-code-generation-started", () => {
                console.log("Loading iniciado");
            });

            socket.on("qr-code-generation-done", ({ qrcode }) => {
                console.log("Loading Finalizado");
                setQRcode(qrcode);
            });

            socket.on("qr-code-generation-expired", () => {
                console.log("Exibir botão [Gerar QrCode] Novamente");
            });

            socket.on("disconnect", () => {
                socket.disconnect();
                console.log('Servidor Desconectou');
            });
        });
    }

    return (
        <div id="qrcode" className={styles.pageContainer}>
            <BigWhiteCard id="big-white-card" className={styles.bigWhiteCard}>
                <Heading fontSize="xs" className={styles.title}>
                    Iniciar Sessão
                </Heading>

                <Text body className={styles.text}>
                    Vá em aparelhos conectados no seu whatsapp e aponte para o
                    QRCODE abaixos
                </Text>

                <div className={styles.qrCodeContainer}>
                    <img src={qrCode} alt="qrCode" />
                </div>

                <div className={styles.cancelOperationBtn}>
                    <Button>Cancelar Operação</Button>
                </div>
            </BigWhiteCard>
        </div>
    );
}

export default Qrcode;