import axios from 'axios';

const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp'
};

const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp)
};

export const logout = () => {
    for(const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    // window.location = window.location.origin;
};

const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;

    if(!accessToken || !timestamp) {
        return true;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return (millisecondsElapsed / 1000) > Number(expireTime);
}

const refreshToken = async () => {
    try {
        if(!LOCALSTORAGE_VALUES.refreshToken || 
            LOCALSTORAGE_VALUES.refreshToken === 'undefined' ||
            (Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000) < 1000)
        {
            console.error('No refresh token available.');
            logout();
            return;
        } 

        const { data } = await axios.get(`http://localhost:8888/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`);

        window.localStorage.setItem(LOCALSTORAGE_KEYS.accessToken, data.access_token);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        window.location.reload();

    } catch(err) {
        console.log(err);
    }
};

const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in')
    };

    const hasError = urlParams.get('error');
  
    if(hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.accessToken === 'undefined') {
        refreshToken();
    }

    if(LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        return LOCALSTORAGE_VALUES.accessToken;
    }

    if(queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        for(const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }

        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());

        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    return false;
};

export const accessToken = getAccessToken();

axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
axios.defaults.headers['Content-Type'] = 'application/json';

export const getCurrentUserProfile = async() => await axios.get('/me');

export const getCurrentUserPlaylists = async() => await axios.get('/me/playlists?offset=0&limit=40');

export const getCurrentUserSongsFromPlaylist = async(id) => await axios.get(`/playlists/${id}/tracks`);