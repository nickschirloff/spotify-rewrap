import styles from './styles.module.scss';
import { getGreeting } from '../../models/Util';
import { useNavigate } from 'react-router-dom';

const Home = ({ profileData }) => {

  const navigate = useNavigate();

  const redirect = () => {
    navigate('/playlistSelection');
  };

  return (
    <div className={styles.home}>
      <h1>{getGreeting()}, {profileData.display_name}.</h1>
      <img src={profileData.images[1].url} alt="" />
      <button onClick={redirect}>Ready to Play?</button>
    </div>
  )
}

export default Home