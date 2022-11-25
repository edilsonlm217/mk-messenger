import React from 'react';
import { ArrowLeft } from 'phosphor-react';
import Text from '../../components/Text';
import Input from '../../components/Input';
import Heading from '../../components/Heading';
import BigWhiteCard from '../../components/BigWhiteCard';


import styles from './styles.module.scss';
import Button from '../../components/Button';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
    const router = useRouter();

    function handleBackToHome(): void {
        router.back();
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

                <form>
                    <Input
                        haserror={false}
                        placeholder="Informe seu login"
                        label="Login"
                    />

                    <Input password={true} haserror={false} />

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