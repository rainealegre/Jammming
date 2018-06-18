import React from 'react';
import './SearchResults.css';

import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
        return(
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList 
                    tracks={this.props.searchResults}
                    onAdd={this.props.onAdd}
                    isRemoval={true}
                    onPlay={this.props.onPlay}
                    onPause={this.props.onPause}
                    isPlaying={this.props.isPlaying}
                    shouldPlay={this.props.shouldPlay}
                />
            </div>
        );
    }
}

export default SearchResults;