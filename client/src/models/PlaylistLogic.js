import { getCurrentUserSongsFromPlaylist } from "./SpotifyLogic";

export const getWrappedPlaylists = (playlists) => {
    let wrappedPlaylists = [];

    playlists.map((item) => {
        if(item.name.includes("Wrapped") && /^201[7-9]|202[0-3]/.test(item.name)) {
            wrappedPlaylists.push(item);
        }   
    });
    return wrappedPlaylists;
};

export const getRandomPlaylistAndSong = (playlists) => {
    const randomPlaylistIndex = Math.floor(Math.random() * playlists.length);
    const randomPlaylistID = playlists[randomPlaylistIndex].id;

    const randomPlaylistTracks = getCurrentUserSongsFromPlaylist(randomPlaylistID);
    const randomSongIndex = Math.floor(Math.random() * randomPlaylistTracks.length);
    return randomPlaylistTracks[randomSongIndex];
}



export const getRandomSongFromPlaylists = (playlists) => {
    const playlistIndex = Math.floor(Math.random() * playlists.length);
    const playlistID = playlists[playlistIndex].id;

    const playlistTracks = getCurrentUserSongsFromPlaylist(playlistID);
    console.log(playlistTracks);

};

export const testGetSongs = (id) => {
    return getCurrentUserSongsFromPlaylist(id);
}