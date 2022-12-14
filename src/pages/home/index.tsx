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
import Timer from '../../components/Timer';
import { useRouter } from 'next/router';

var promiseResolve: Function, promiseReject: Function;

const Home: React.FC = () => {
    const router = useRouter();

    const [userName, setUserName] = useState("");
    const [hasSession, setHasSession] = useState(false);
    const [qrCode, setQRcode] = useState<string | null>(null);
    const [showTimer, setShowTimer] = useState(false);
    const [initialTime, setInitialTime] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        function redirectIfSessionNameIsEmpty(): void {
            if (!LocalStorage.sessionNameExists()) {
                router.push("/");
            }
        }

        redirectIfSessionNameIsEmpty();
    }, [router]);

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

        function getUserNameFromStorage() {
            const user = LocalStorage.getItem("client-name");
            if (user) { setUserName(user) }
        }

        getUserNameFromStorage();
        fetchSession();
    }), [];

    function handleStartSession(): void {
        generateQrCode();
    }

    function handleLogout(): void {
        LocalStorage.clear();
        router.push("/");
    }

    async function generateQrCode(): Promise<void> {
        const sessionName = LocalStorage.getItem("client-session-name");

        const socket = io(`http://localhost:3333`, {
            query: {
                sessionName: sessionName
            }
        });

        socket.on("on-going-qr-code-generation-detected", ({ createdAt }) => {
            toast.warn("Voc?? realizou uma tentativa recentemente, por favor aguarde!");
            setShowTimer(true)
            setInitialTime(createdAt);
            socket.disconnect();
        });

        socket.on("qr-code-generation-starting", () => {
            setIsLoading(true);
            toast.promise(
                new Promise(function (resolve, reject) {
                    promiseResolve = resolve;
                    promiseReject = reject;
                }),
                {
                    pending: 'Preparando QR Code',
                    success: 'QR Code dispon??vel',
                    error: 'N??o foi poss??vel gerar QR Code'
                }
            )
        });

        socket.on("qr-code-ready", ({ qrcode }) => {
            setIsLoading(false);
            setQRcode(qrcode);
            promiseResolve();
        });

        socket.on("qr-code-successfully-read", () => {
            toast.success("Sess??o iniciada com sucesso");
            setQRcode(null);
            socket.disconnect();
        });

        socket.on("qr-code-generation-expired", () => {
            toast.warn("QR Code n??o lido. Tente novamente!");
            setIsLoading(false);
            setQRcode(null);
            socket.disconnect();
        });

        socket.on("disconnect", () => {
            socket.disconnect();
            if (promiseReject) { promiseReject() }
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
                            <span>{userName}</span>
                        </Text>
                        <SignOut
                            size={22}
                            color="#292929"
                            weight="bold"
                            className={styles.icon}
                            onClick={handleLogout}
                        />
                    </div>

                    <Heading fontSize="xxs" className={styles.title}>
                        Minha Sess??o
                    </Heading>

                    {!hasSession
                        ? <Text body>Voc?? ainda n??o possui uma sess??o.</Text>
                        : <div className={styles.cardContainer}>
                            <SessionCard />
                        </div>
                    }

                    {!hasSession
                        ? <div className={styles.startSession}>
                            <Button onClick={handleStartSession} isLoading={isLoading}>
                                Iniciar sess??o
                            </Button>
                        </div>
                        : <></>
                    }

                    {showTimer
                        ? <Timer initialTime={initialTime} />
                        : <></>
                    }
                </BigWhiteCard>
            </div>
        );
    }
}

export default Home;