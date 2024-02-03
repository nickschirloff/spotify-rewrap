import styles from './styles.module.scss';

const PlaylistItem = ({ playlistImg, playlistName, index }) => {
  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistItemCover}>
        <img src={playlistImg} alt="" />
      </div>
      <div className={styles.playlistItemData}>
        <h2>{playlistName}</h2>
        <button>X</button>
      </div>
    </div>
  )
}

export default PlaylistItem