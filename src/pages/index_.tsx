import { useEffect, useState } from 'react';
import axios from 'axios';
import { io, Socket } from "socket.io-client";

import { WhatsappLogo } from 'phosphor-react';

import styles from '../styles/styles.module.scss';

export default function Home() {
  const [qrCode_, setQRcode] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleGenQRCode() {
    const socket = io(`http://localhost:3333`, {
      query: {
        client: "mk-edge"
      }
    });

    socket.on("successfully-connected", async () => {
      console.log("Conectado com sucesso");

      socket.on("qr-code-generation-started", () => {
        console.log("Loading iniciado");
        setIsLoading(true);
      });

      socket.on("qr-code-generation-done", ({ qrcode }) => {
        console.log("Loading Finalizado");
        setIsLoading(true);
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

    setSocket(socket);
  }

  function handleDisconnect() {
    socket?.disconnect();
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

      {!socket &&
        <button onClick={handleGenQRCode} className={styles.btnGenQrCode}>
          Gerar QRCODE
        </button>
      }

      {socket &&
        <button onClick={handleDisconnect} className={styles.btnGenQrCode}>
          Disconnect WEBSOCKET
        </button>
      }
    </div>
  )
}

