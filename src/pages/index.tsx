import BigWhiteCard from '../components/BigWhiteCard';
import Heading from '../components/Heading';
import Button from '../components/Button';
import Text from '../components/Text';

import styles from '../styles/styles.module.scss';

export default function Home() {
  return (
    <div id="home" className={styles.pageContainer}>
      <BigWhiteCard id="big-white-card">
        <Heading fontSize="md" className={styles.cardHeading}>
          Bem vindo ao <span>M</span><span>K</span>-<span>Messenger</span>
        </Heading>

        <Text body className={styles.text}>
          Você não possui uma sessão ativa no momento
        </Text>
      </BigWhiteCard>
    </div >
  )
}

