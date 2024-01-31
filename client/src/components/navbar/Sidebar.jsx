import styles from './styles.module.scss';
import sidebarOptions from './SidebarOptions';
import { useState } from 'react';
import MenuIcon from '../../assets/icons/navbar/hamburger-menu.svg';

const Sidebar = () => {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.sidebar}>
      <img src={MenuIcon} alt="" onClick={() => setIsOpen(!isOpen)}/>
      {isOpen && 
        <div className={styles.sidebarExpand}>
          test
        </div>
      }
    </div>
  )
}

export default Sidebar;