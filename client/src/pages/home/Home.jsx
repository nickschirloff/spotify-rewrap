import styles from './styles.module.scss';
import { getCurrentUserPlaylists } from '../../models/SpotifyLogic';
import { getGreeting } from '../../models/Util';
import { useNavigate } from 'react-router-dom';

const Home = ({ profileData }) => {

  // TODO: Move getting playlist data to rewrap section

  const navigate = useNavigate();
  const profile = profileData;

  const handleGetPlaylists = async() => {
    try {
      const playlistData = await getCurrentUserPlaylists();
      const playlistList = playlistData.data.items;
      navigate('/rewrap', { state: playlistList });

    } catch(err) {
      console.log(err.message);
    }

  };

  return (
    <div className={styles.home}>
      <h1>{getGreeting()}, {profile.display_name}.</h1>
      <img src={profile.images[1].url} alt="" />
      <button onClick={handleGetPlaylists}>Ready to Play?</button>
    </div>
  )
}

export default Home