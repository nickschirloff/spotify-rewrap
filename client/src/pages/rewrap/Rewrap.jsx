import styles from './styles.module.scss';
import { getRandomPlaylistAndSong } from '../../models/PlaylistLogic';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Rewrap = () => {

  const { state } = useLocation();
  // const { wrappedPlaylists } = state;
  const [playlistList, setPlaylistList] = useState(state);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const getSong = async() => {
      const songData = await getRandomPlaylistAndSong(playlistList);
      console.log("Song Data: " + JSON.stringify(songData));
      setCurrentSong(songData);
    };
    getSong();
  }, [])

  return (
    <div className={styles.rewrap}>
      {currentSong && 
        <div className={styles.rewrapContainer}>
          <img src={currentSong.album.images[0].url} alt="" />
          <p>{currentSong.name}</p>
          <p>by {currentSong.artists[0].name}</p>
          <p>Appeared in what year of your Wrapped playlists?</p>
          <div className={styles.rewrapAnswers}>
            <button>2020</button>
            <button>2017</button>
            <button>2023</button>
            <button>2019</button>
          </div>
        </div>
      }
    </div>
  )
}

export default Rewrap