import Button from '../components/Button';
import BigWhiteCard from '../components/BigWhiteCard';

import styles from '../styles/styles.module.scss';

export default function Home() {
  return (
    <div id="home" className={styles.pageContainer}>
      <BigWhiteCard>
        <h1>Hello World</h1>
      </BigWhiteCard>
    </div>
  )
}

