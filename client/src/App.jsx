import './App.css'
import Navbar from './components/navbar/Navbar';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { accessToken, getCurrentUserProfile, logout } from './models/SpotifyLogic';
import { useState, useEffect } from 'react';

function App() {

  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  console.log("TOK: " + token);
  console.log("PRO: " + profile);

  useEffect(() => {
    setToken(accessToken);

    const getProfileData = async() => {
      try {
        const { data } = await getCurrentUserProfile();
        console.log("Data: " + JSON.stringify(data));
        setProfile(data); 
      } catch(e) {
        console.error(e);
      }
    };
    getProfileData();
  }, []);

  return (
    <>
      <Navbar />
      {!token ? (
        <Login /> 
        ) : (
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        </Router>
        )
      }

    </>
  )
}

export default App
