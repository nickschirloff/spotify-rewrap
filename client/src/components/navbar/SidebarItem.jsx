import styles from './styles.module.scss';

const SidebarItem = ({ data }) => {
  
  return (
    <div className={styles.sidebarItem}>
      <img src={data.icon} alt="" />
      <p>{data.name}</p>      
    </div>
  )
}

export default SidebarItem;