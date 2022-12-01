import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import LocalStorage from '../services/LocalStorage';
import BigWhiteCard from '../components/BigWhiteCard';
import Heading from '../components/Heading';
import Button from '../components/Button';
import Input from '../components/Input';
import Text from '../components/Text';

import styles from '../styles/styles.module.scss';

interface UserCredentials {
  id: string
  cnpj: string
  createdAt: string
  name: string
  sessionName: string
  updatedAt: string
}

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [pwd, setPwd] = useState("");
  const [isFormInvalid, setIsFormInvalid] = useState(false);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      const response = await toast.promise(validateUser, {
        pending: 'Autenticando',
        success: 'Sem Bem Vindo',
        error: 'Login ou senha inválidos'
      });
      const user: UserCredentials = response.data.user;
      saveUser(user);
      sendToNext();
    } catch (error) {
      setIsFormInvalid(true);
    }
  }

  function validateUser() {
    const options = {
      method: 'POST',
      url: 'http://localhost:3333/auth',
      headers: { 'Content-Type': 'application/json' },
      data: { login: login, password: pwd }
    };
    return axios(options);
  }

  function saveUser(user: UserCredentials): void {
    LocalStorage.setItem("client-name", user.name);
    LocalStorage.setItem("client-cnpj", user.cnpj);
    LocalStorage.setItem("client-session-name", user.sessionName);
  }

  function sendToNext(): void {
    console.log('Implement send to next');
  }

  return (
    <div id="home" className={styles.pageContainer}>
      <BigWhiteCard id="big-white-card" className={styles.bigWhiteCard}>
        <Heading fontSize="md" className={styles.cardHeading}>
          Bem vindo ao <span>M</span><span>K</span>-<span>Messenger</span>
        </Heading>

        <Text body className={styles.text}>
          Identifique-se para começar!
        </Text>

        <form onSubmit={handleFormSubmit}>
          <Input
            onChange={(e) => setLogin(e.currentTarget.value)}
            haserror={isFormInvalid}
            placeholder="Informe seu login"
            label="Login"
            onClick={() => setIsFormInvalid(false)}
          />

          <Input
            password
            onChange={(e) => setPwd(e.currentTarget.value)}
            haserror={isFormInvalid}
            onClick={() => setIsFormInvalid(false)}
          />

          <div className={styles.startBtn}>
            <Button>Começar</Button>
          </div>
        </form>

      </BigWhiteCard>
    </div >
  )
}

