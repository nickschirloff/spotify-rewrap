import styles from './styles.module.scss';

const PlaylistItem = ({ playlistImg, playlistName, index, onClickFunction }) => {
  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistItemCover}>
        <img src={playlistImg} alt="" />
      </div>
      <div className={styles.playlistItemData}>
        <h2>{playlistName}</h2>
        <button onClick={() => onClickFunction(index)}>X</button>
      </div>
    </div>
  )
}

export default PlaylistItem