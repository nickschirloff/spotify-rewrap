import styles from './styles.module.scss';
import PlaylistItem from '../../components/playlistitem/PlaylistItem';
import { useLocation } from 'react-router-dom';
import { getWrappedPlaylists } from '../../models/PlaylistLogic';
import { useState, useEffect } from 'react';
import { getCurrentUserSongsFromPlaylist } from '../../models/SpotifyLogic';
import GameComponent from '../../components/game/GameComponent';

const Rewrap = () => {

  const { state } = useLocation();
  const [wrappedPlayists, setWrappedPlaylists] = useState(getWrappedPlaylists(state));
  const [playlistTracks, setPlaylistTracks] = useState({});

  // console.log("ex: " + JSON.stringify(state[0]));

  getCurrentUserSongsFromPlaylist(state[0].id).then((data) => {
    console.log("Data: " + JSON.stringify(data.data.items[0].track));
    setPlaylistTracks(data.data.items[0].track);
  });

  const removeFromWrappedPlaylists = (index) => {
    const removeID = wrappedPlayists[index].id;
    setWrappedPlaylists((current) => 
      current.filter((playlist) => playlist.id !== removeID)
    );
  };


  return (
    <div className={styles.rewrap}>
      <div className={styles.rewrapContainer}>
        <h1>Did We Get Everything?</h1>
        <p>Click the 'X' to remove non-Wrapped playlists.</p>
        {
          wrappedPlayists.map((item, index) => {
            return <PlaylistItem 
            playlistImg={item.images[0].url} 
            playlistName={item.name} 
            index={index}
            key={index}
            onClickFunction={removeFromWrappedPlaylists}
            />
          })
        }
        <button>Let's Go</button>
      </div>
      {playlistTracks && // Temporary place for this component. Just checking to make sure logic works
        <GameComponent track={playlistTracks} years={[2021]} />
      }
    </div>
  )
}

export default Rewrap;