import './App.css'
import Navbar from './components/navbar/Navbar';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Rewrap from './pages/rewrap/Rewrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { accessToken, getCurrentUserProfile, logout } from './models/SpotifyLogic';
import { useState, useEffect } from 'react';
import PlaylistSelection from './pages/rewrap/PlaylistSelection';

function App() {

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const getProfileData = async() => {
      try {
        const { data } = await getCurrentUserProfile();
        setProfile(data); 
      } catch(e) {
        console.error(e);
      }
    };
    getProfileData();
  }, []);

  return (
    <>
      {!token ? (
        <Login /> 
        ) : (
        <>
          {profile && (
            <>
            <Navbar />
            <Router>
              <Routes>
                <Route path="/" element={<Home profileData={profile} />} />
                <Route path="/playlistSelection" element={<PlaylistSelection />} />
                <Route path="/rewrap" element={<Rewrap />} />
              </Routes>
            </Router>
          </>
          )}
        </>
        )
      }

    </>
  )
}

export default App;