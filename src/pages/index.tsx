import styles from '../styles/styles.module.scss';
import { WhatsappLogo } from 'phosphor-react';

export default function Home() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h1>Bem vindo ao MK-Messenger</h1>
      </div>

      <p>Você não possui uma sessão ativa no momento</p>

      <div className={styles.content}>
        <WhatsappLogo size={96} color="#292929" weight="light" />
      </div>

      <p>Para iniciar sessão clique abaixo:</p>

      <button className={styles.btnGenQrCode}>
        Gerar QRCODE
      </button>
    </div>
  )
}
