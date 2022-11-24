import BigWhiteCard from '../components/BigWhiteCard';
import Heading from '../components/Heading';
import Button from '../components/Button';
import Text from '../components/Text';

import { WhatsappLogo } from 'phosphor-react';

import styles from '../styles/styles.module.scss';

export default function Home() {
  return (
    <div id="home" className={styles.pageContainer}>
      <BigWhiteCard id="big-white-card" className={styles.bigWhiteCard}>
        <Heading fontSize="md" className={styles.cardHeading}>
          Bem vindo ao <span>M</span><span>K</span>-<span>Messenger</span>
        </Heading>

        <Text body className={styles.text}>
          Você não possui uma sessão ativa no momento
        </Text>

        <WhatsappLogo
          size={96}
          color="#292929"
          weight="light"
          className={styles.whatsappLogo}
        />

        <Text body className={styles.text}>
          Clique abaixo para iniciar uma sessão
        </Text>

        <div className={styles.startBtn}>
          <Button>Começar</Button>
        </div>
      </BigWhiteCard>
    </div >
  )
}

