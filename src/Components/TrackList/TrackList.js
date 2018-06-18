import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

class TrackList extends React.Component {
    render() {
        return(
            <div className="TrackList">
                {
                    this.props.tracks.map(track =>
                        <Track 
                            key={track.id}  
                            track={track}
                            onAdd={this.props.onAdd}  
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval}
                            onPlay={this.props.onPlay}
                            onPause={this.props.onPause}
                            isPlaying={this.props.isPlaying}
                            shouldPlay={this.props.shouldPlay}
                        />
                    )
                }
            </div>
        );
    }
}

export default TrackList;