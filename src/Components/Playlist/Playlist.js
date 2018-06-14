import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
    render() {
        return(
            <div className="Playlist">
                <input value={this.props.name} onChange={this.props.onNameChange}/>
                <TrackList 
                    tracks={this.props.tracks}
                    onRemove={this.props.onRemove}
                    isRemoval={false}
                />
                <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default Playlist;