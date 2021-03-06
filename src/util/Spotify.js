
var state = Math.trunc(Math.random() * 100000).toString()
localStorage.setItem('stateKey', state);

const client_id = '1e11b31ca91c432595167a7532979dd1';
const redirect_uri = 'https://jammable-dev.surge.sh'//'http://localhost:3000/';
const scope = 'user-read-private user-read-email playlist-modify-public';
const accessUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(client_id)}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&state=${encodeURIComponent(state)}`

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1]
      const expiresIn = +expiresInMatch[1]
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = accessUrl;
    }
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken()
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(resp => resp.json())
      .then(resp => {
        return resp.tracks ?
          resp.tracks.items.map(track => {
            return { id: track.id, name: track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri }
          }) : []
      });
  },

  async savePlaylist(playlistName, trackURIs) {
    if (!playlistName || trackURIs.length === 0) {
      return
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` }

    let userId;
    await fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(resp => resp.json())
      .then(respJson => {
        userId = respJson.id;
        return respJson.display_name;
      });
    if (!userId) return;

    let playListId;
    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST', headers: headers, body: JSON.stringify({
        name: playlistName,
        description: "New playlist description",
        public: true
      })
    })
      .then(resp => resp.json())
      .then(respJson => {
        playListId = respJson.id;
      })
    if (!playListId) return;

    await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
      { method: 'POST', headers: headers, body: JSON.stringify({ uris: trackURIs, position: 0 }) })
      .then(resp => resp.json())
      .then(respJson => {
        console.log('success!')
        console.log(respJson.snapshot_id)
      })
  }
}

export default Spotify;