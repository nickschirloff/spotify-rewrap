import styles from './styles.module.scss';
import PlaylistItem from '../../components/playlistitem/PlaylistItem';
import { Audio } from 'react-loader-spinner';
import { getCurrentUserPlaylists } from '../../models/SpotifyLogic';
import { getWrappedPlaylists } from '../../models/PlaylistLogic';
import { useEffect, useState } from 'react';

const PlaylistSelection = () => {

  // Declaring two similar states, but with different functions here
  // If the filter incorrectly misses a playlist, or if a user wants to
  // add another non-Wrapped playlist, we'll need to give them the option
  // to view and add their other playlists, so we get the playlists in
  // incriments of (25) (if I had a dollar for every time I've typed the word 'playlist'...)
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userWrappedPlaylists, setUserWrappedPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  

  const getPlaylists = async() => {
    const playlistsData = await getCurrentUserPlaylists();
    setUserPlaylists(playlistsData.data.items);
    return playlistsData.data.items;
  };

  const getFilteredPlaylists = async() => {
    const playlists = await getPlaylists();
    const filteredPlaylists = getWrappedPlaylists(playlists);
    setUserWrappedPlaylists(filteredPlaylists);
  };


  useEffect(() => {
    try {
        getFilteredPlaylists();
        setIsLoading(false);
    } catch(err) {
        console.error(err);
        setError(err);
    }
  }, []);

  return (
    <div className={styles.playlistSelection}>
      {isLoading ?
        <div className={styles.playlistSelectionContainerLoading}>
          <Audio />
          <p>Getting your playlists...</p>
        </div> :
        <div className={styles.playlistSelectionContainer}>
          <h1>Did We Miss Anything?</h1>
          <p>Check any playlists that are Wrapped playlists. Uncheck any others.</p>
          <div className={styles.playlistSelection}>
            {
              userWrappedPlaylists.map((playlist, index) => {
                return <PlaylistItem 
                  playlistImg={playlist.images[0].url}
                  playlistName={playlist.name}
                  index={index}
                  key={index}
                />
              })
            }
            <button>Let's Go</button>
          </div>
        </div>
      }
    </div>
  )
}

export default PlaylistSelection