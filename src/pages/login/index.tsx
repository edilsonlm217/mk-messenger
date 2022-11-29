import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft } from 'phosphor-react';
import LocalStorage from '../../services/LocalStorage';

import axios from 'axios';

import Text from '../../components/Text';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Heading from '../../components/Heading';
import BigWhiteCard from '../../components/BigWhiteCard';

import styles from './styles.module.scss';

interface UserCredentials {
    id: string
    cnpj: string
    createdAt: string
    name: string
    sessionName: string
    updatedAt: string
}

const Login: React.FC = () => {
    const [login, setLogin] = useState("");
    const [pwd, setPwd] = useState("");
    const [loginHasError, setLoginHasError] = useState(false);
    const [pwdHasError, setPwdHasError] = useState(false);

    const router = useRouter();

    useEffect(() => { redirectIfSessionNameExists() }, []);

    function handleBackToHome(): void {
        router.back();
    }

    function handleLoginOnChange(e: React.FormEvent<HTMLInputElement>): void {
        setLogin(e.currentTarget.value);
    }

    function handlePwdOnChange(e: React.FormEvent<HTMLInputElement>): void {
        setPwd(e.currentTarget.value);
    }

    function handleInputOnClick(field: string) {
        if (field === 'login' && loginHasError) {
            setLoginHasError(false);
        }

        if (field === 'pwd' && pwdHasError) {
            setPwdHasError(false);
        }
    }

    async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        try {
            const options = {
                method: 'POST',
                url: 'http://localhost:3333/auth',
                headers: { 'Content-Type': 'application/json' },
                data: { login: login, password: pwd }
            };
            const response = await axios(options);
            const user: UserCredentials = response.data.user;
            LocalStorage.setItem("client-name", user.name);
            LocalStorage.setItem("client-cnpj", user.cnpj);
            LocalStorage.setItem("client-session-name", user.sessionName);
            router.push("/qrcode");
        } catch (error) {
            if (error instanceof Error && error.message.includes("401")) {
                alert('Usuário ou senha inválidos');
                setLoginHasError(true);
                setPwdHasError(true);
            }
        }
    }

    function redirectIfSessionNameExists(): void {
        if (LocalStorage.sessionNameExists()) {
            router.push("/qrcode");
        }
    }

    return (
        <div id="login" className={styles.pageContainer}>
            <BigWhiteCard id="big-white-card" className={styles.bigWhiteCard}>
                <div className={styles.header}>
                    <ArrowLeft size={24}
                        color="#292929" weight="bold"
                        className={styles.arrowLeft}
                        onClick={handleBackToHome}
                    />
                    <Heading fontSize="xs" className={styles.title}>
                        Iniciar Sessão
                    </Heading>
                </div>

                <Text body className={styles.text}>
                    Informe seus dados de login para gerar o QRCODE
                </Text>

                <form onSubmit={handleFormSubmit}>
                    <Input
                        onChange={handleLoginOnChange}
                        haserror={loginHasError}
                        placeholder="Informe seu login"
                        label="Login"
                        onClick={() => handleInputOnClick("login")}
                    />

                    <Input
                        password
                        onChange={handlePwdOnChange}
                        haserror={pwdHasError}
                        onClick={() => handleInputOnClick("pwd")}
                    />

                    <div className={styles.submitBtn}>
                        <Button>Gerar QRCODE</Button>
                    </div>
                </form>

                <a className={styles.link} href='#'>Registrar-se</a>
            </BigWhiteCard>
        </div>
    );
}

export default Login;