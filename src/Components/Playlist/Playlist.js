import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return(
            <div className="Playlist">
                <input value={this.props.name} onChange={this.handleNameChange}/>
                <TrackList 
                    tracks={this.props.tracks}
                    onRemove={this.props.onRemove}
                    isRemoval={false}
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    isPlaying={this.props.isPlaying}
                    shouldPlay={this.props.shouldPlay}
                />
                <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default Playlist;