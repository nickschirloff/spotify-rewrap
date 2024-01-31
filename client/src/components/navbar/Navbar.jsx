import styles from './styles.module.scss';
import Sidebar from './Sidebar';

const Navbar = () => {

  
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <a href="/">Spotify Re-Wrap</a>
      </div>
      <div className={styles.navbarRight}>
        <Sidebar />
      </div>
    </div>
  )
}

export default Navbar;