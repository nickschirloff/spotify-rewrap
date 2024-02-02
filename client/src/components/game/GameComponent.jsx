import styles from './styles.module.scss';

const GameComponent = ({ track, years }) => {

    /* Testing Game Logic Here */
  return (
    <div className={styles.gameComponent}>
      <h1>In what year did '{track.name}' make your top 100?</h1>
      <img src={track.album.images[0].url} alt="" />
      <div className={styles.options}>
        <button>{years[0]}</button>
        <button>2017</button>
        <button>2020</button>
        <button>2018</button>
      </div>
    </div>
  )
}

export default GameComponent;