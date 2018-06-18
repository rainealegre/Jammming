import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: 'New Playlist',
            playlistTracks: [],
            currentlyPlaying: '',
            isPlaying: false
        };

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);

        this.audio;
    }

    addTrack(track) {
        if (this.state.playlistTracks.find(savedTrack =>
        savedTrack.id === track.id)) {
            return;
        } else {
            let playlistTracks = this.state.playlistTracks.concat(track);
            this.setState({ playlistTracks: playlistTracks });
        }
    }

    removeTrack(track) {
        let playlistTracks = this.state.playlistTracks.filter(slctrack => 
        slctrack.id !== track.id);
        this.setState({ playlistTracks: playlistTracks });
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({ playlistName: 'New Playlist', playlistTracks: [] });
    }

    search(term) {
        Spotify.search(term).then(tracks => 
            this.setState({ searchResults: tracks }));
    }

    playTrack(trackUrl) {
        if (this.state.currentlyPlaying) {
            this.pauseTrack();
        }
        this.audio = new Audio(trackUrl);
        let currentlyPlaying = trackUrl;
        this.audio.play();
        this.setState({ isPlaying: true, currentlyPlaying: currentlyPlaying });
    }

    pauseTrack() {
        this.audio.pause();
        this.setState({ isPlaying: false, currentlyPlaying: '' });
    }

    render() {
        return(
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar 
                        onSearch={this.search}
                    />
                    <div className="App-playlist">
                        <SearchResults 
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                            onPlay={this.playTrack}
                            onPause={this.pauseTrack}
                            isPlaying={this.state.isPlaying}
                            shouldPlay={this.state.currentlyPlaying}
                        />
                        <Playlist 
                            name={this.state.playlistName}
                            tracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                            onPlay={this.playTrack}
                            onPause={this.pauseTrack}
                            isPlaying={this.state.isPlaying}
                            shouldPlay={this.state.currentlyPlaying}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;