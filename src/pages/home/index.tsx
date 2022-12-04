import React, { useEffect, useState } from 'react';
import axios from "axios";
import { SignOut } from 'phosphor-react';
import { io } from "socket.io-client";

import Text from '../../components/Text';
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import BigWhiteCard from '../../components/BigWhiteCard';

import LocalStorage from '../../services/LocalStorage';
import SessionCard from '../../components/SessionCard';

import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import QrCode from '../../components/QrCode';

var promiseResolve: Function, promiseReject: Function;

const Home: React.FC = () => {
    const [hasSession, setHasSession] = useState(false);
    const [qrCode, setQRcode] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSession(): Promise<void> {
            const sessionName = LocalStorage.getItem("client-session-name");
            const options = {
                method: 'GET',
                url: `http://localhost:3333/session/${sessionName}`
            };
            try {
                await axios.request(options);
                setHasSession(true);
            } catch (error) {
                setHasSession(false);
            }
        }
        fetchSession();
    }), [];

    function handleStartSession(): void {
        generateQrCode();
    }

    async function generateQrCode() {
        const sessionName = LocalStorage.getItem("client-session-name");

        const socket = io(`http://localhost:3333`, {
            query: {
                sessionName: sessionName
            }
        });

        socket.on("on-going-qr-code-generation-detected", ({ createdAt }) => {
            console.log(sessionName);
            console.log("Já tem uma sessão onGoing");
            console.log("createdAt", createdAt);
            toast.warn("Você realizou uma tentativa recentemente, por favor aguarde!");
            socket.disconnect();
        });

        socket.on("qr-code-generation-starting", () => {
            console.log("Loading iniciado");
            toast.promise(
                new Promise(function (resolve, reject) {
                    promiseResolve = resolve;
                    promiseReject = reject;
                }),
                {
                    pending: 'Preparando QR Code',
                    success: 'QR Code disponível',
                    error: 'Não foi possível gerar QR Code'
                }
            )
        });

        socket.on("qr-code-ready", ({ qrcode }) => {
            console.log("QR Code Pronto");
            setQRcode(qrcode);
            promiseResolve();
        });

        socket.on("qr-code-successfully-read", () => {
            console.log("QR Lido com Sucesso");
            toast.success("Success Notification !");
            setQRcode(null);
            socket.disconnect();
        });

        socket.on("qr-code-generation-expired", () => {
            console.log("QR Code não Lido");
            toast.warn("QR Code não lido. Tente novamente!");
            setQRcode(null);
            socket.disconnect();
        });

        socket.on("disconnect", () => {
            socket.disconnect();
            if (promiseReject) { promiseReject() }
            console.log('Servidor Desconectou');
        });

    }

    if (qrCode) {
        return (
            <QrCode qrcode={qrCode} />
        );
    } else {
        return (
            <div id="home" className={styles.pageContainer}>
                <BigWhiteCard
                    id="big-white-card"
                    className={styles.bigWhiteCard}
                    useFooter
                >
                    <div className={styles.header}>
                        <Text body className={styles.text}>
                            Bem vindo, <br />
                            <span>Oscarellys Daniela</span>
                        </Text>
                        <SignOut
                            size={22}
                            color="#292929"
                            weight="bold"
                            className={styles.icon}
                        />
                    </div>

                    <Heading fontSize="xxs" className={styles.title}>
                        Minha Sessão
                    </Heading>

                    {!hasSession
                        ? <Text body>Você ainda não possui uma sessão.</Text>
                        : <div className={styles.cardContainer}>
                            <SessionCard />
                        </div>
                    }

                    {!hasSession
                        ? <div className={styles.startSession}>
                            <Button onClick={handleStartSession}>Iniciar sessão</Button>
                        </div>
                        : <></>
                    }
                </BigWhiteCard>
            </div>
        );
    }

}

export default Home;