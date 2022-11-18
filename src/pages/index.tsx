import { useState } from 'react';
import { io } from "socket.io-client";
import { WhatsappLogo } from 'phosphor-react';

import styles from '../styles/styles.module.scss';

export default function Home() {
  const [qrCode_, setQRcode] = useState('');

  async function handleIniciarSessao() {
    try {
      const socket = io(`http://localhost:3333`);

      socket.on('read-qr-code', data => {
        console.log('read-qr-code');
        console.log(data);
        setQRcode(data.qrcode);
      });

      socket.on('read-successfully', async () => {
        console.log('read-successfully')
      });

    } catch (error) {
      console.log('Chamada a API falhou');
      console.log(error);
    }

  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h1>Bem vindo ao MK-Messenger</h1>
      </div>

      <div className={styles.content}>
        {qrCode_ !== ''
          ? <img src={qrCode_} alt="qrCode" />
          : <WhatsappLogo size={96} color="#292929" weight="light" />
        }
      </div>

      <p>Para iniciar sessão clique abaixo:</p>

      <button onClick={handleIniciarSessao} className={styles.btnGenQrCode}>
        Gerar QRCODE
      </button>
    </div>
  )
}
