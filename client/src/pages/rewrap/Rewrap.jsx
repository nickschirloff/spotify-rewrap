import styles from './styles.module.scss';
import { useLocation } from 'react-router-dom';

const Rewrap = () => {

  const playlistList = useLocation();
  console.log("PD: " + playlistList);

  return (
    <div className={styles.rewrap}>
      Rewrap
    </div>
  )
}

export default Rewrap;