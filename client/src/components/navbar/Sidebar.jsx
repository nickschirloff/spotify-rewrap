import styles from './styles.module.scss';
import sidebarOptions from './SidebarOptions';
import { useState } from 'react';
import MenuIcon from '../../assets/icons/navbar/hamburger-menu.svg';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const sidebarItems = sidebarOptions;

  return (
    <div className={styles.sidebar}>
      <img src={MenuIcon} alt="" onClick={() => setIsOpen(!isOpen)}/>
      {isOpen && 
        <div className={styles.sidebarExpand}>
          {sidebarItems.map((data, index) => {
            return <SidebarItem data={data} key={index} />
          })}
        </div>
      }
    </div>
  )
}

export default Sidebar;