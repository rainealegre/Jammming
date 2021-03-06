import client_Id from '../Secret';

const clientId = client_Id; 
const spotifySearchAPI = 'https://api.spotify.com/v1/search';
const spotifyUserProfileAPI = 'https://api.spotify.com/v1/me';
const spotifyPlaylistAPI = 'https://api.spotify.com/v1/users/${userId}/playlists';
const spotifyPlaylistTracksAPI = 'https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks';
//const redirectUrl = 'https://jammmingwithspotify.firebaseapp.com/';

/* surge url */
const redirectUrl = 'http://jammmingwithspotify.surge.sh/';

let accessToken;
let expiresIn;

const Spotify = {

    getAccessToken() {
        // case 1: if accessToken is present
        if (accessToken) {
            return accessToken;
        }
        // case 2: if accessToken is in URL
        let url = window.location.href
        accessToken = this.extract(url, "access_token=", "&");
        if (accessToken) {
            expiresIn = this.extract(url, "expires_in=", "&");
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            console.log("access token successfully retrieved.");
            return accessToken;
        } else {
            // case 3: fetches from spotify
            let state = 4321; // generate state, save to app-state and validate
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectUrl}&state=${state}`;
        }
    },

    /* returns a promise */
    search(term) {
        return fetch(`${spotifySearchAPI}?type=track&q=${term}`,
            {headers: this.buildAuthorizationHeader()})
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.tracks) {
                    //console.log(jsonResponse.tracks);
                    return jsonResponse.tracks.items.map(function(track) {
                        return {
                            id: track.id,
                            name: track.name,
                            uri: track.uri,
                            album: track.album.name,
                            artist: track.artists[0].name,
                            previewTrack: track.preview_url
                        }}
                    )}
                else {
                    return [];
                }
            });
    },

    /* returns a promise */
    savePlaylist(name, trackURIs) {
      return fetch(`${spotifyUserProfileAPI}`,
          {headers: this.buildAuthorizationHeader()})
          .then(response => response.json())
          .then(jsonResponse => {
              let userId = jsonResponse.id;
              return this.createPlaylistWithTracks(userId, name, trackURIs);
          });
    },

    /* returns a promise */
    createPlaylistWithTracks(userId, playlistName, playlistTracks) {
        let jsonBody = JSON.stringify({name: playlistName, public: false});
        let url = spotifyPlaylistAPI.replace("${userId}", userId);
        return fetch(url, { headers: this.buildAuthorizationHeader(),
            method:'POST', body: jsonBody})
            .then(response => this.handleResponse(response))
            .then(jsonResponse => {
                console.log("playlist successfully created.");
                let playlistId = jsonResponse.id;
                return this.saveTracksToPlaylist(userId, playlistId, playlistTracks);
            });
    },

    /* returns a promise */
    saveTracksToPlaylist(userId, playlistId, playlistTracks) {
        let jsonBody = JSON.stringify(playlistTracks);
        let url = spotifyPlaylistTracksAPI.replace("${userId}", userId).replace("${playlistId}", playlistId);
        return fetch(url, { headers: this.buildAuthorizationHeader(),
            method:'POST', body: jsonBody})
            .then(response => this.handleResponse(response))
            .then(jsonResponse => {
                console.log("tracks successful stored");
                return jsonResponse.snapshot_id;
            });
    },

    /* returns a promise */
    handleResponse(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    },

    buildAuthorizationHeader() {
        let token = this.getAccessToken();
        return {Authorization: `Bearer ${token}`};
    },

    /* extracts everything between the end of the keyword and the limiter from the string. if the keyword
     * was not found, return undefined. */
    // TODO write some tests for this
    extract(string, keyword, limiter) {
        let startIndex = string.indexOf(keyword);
        if (startIndex !== -1) {
            // add the length of the keyword to the start position to get the "real" start
            startIndex += keyword.length;
            let endIndex = string.indexOf(limiter, startIndex);
            if (endIndex !== -1) {
                return string.slice(startIndex, endIndex);
            } else {
                return string.slice(startIndex);
            }
        }
        return undefined;
    }
};

export default Spotify;
