import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.renderAction = this.renderAction.bind(this);
        this.renderPlay = this.renderPlay.bind(this);
        this.playTrack = this.playTrack.bind(this);
        this.pauseTrack = this.pauseTrack.bind(this);
    }

    renderAction() {
        if (this.props.isRemoval) {
            return (
                <a 
                    className="Track-action"
                    onClick={this.addTrack}
                >+</a>
            )
        } else {
            return (
                <a 
                    className="Track-action"
                    onClick={this.removeTrack}
                >-</a>
            )  
        }
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    playTrack() {
        this.props.onPlay(this.props.track.previewTrack);
    }

    pauseTrack() {
        this.props.onPause(this.props.track.previewTrack);
    }

    renderPlay() {
        if (this.props.isPlaying && this.props.shouldPlay === this.props.track.previewTrack) {
            return(
                <button onClick={this.pauseTrack}>
                    <img src={require('./pauseButton.png')} />
                </button>
            )
        } else {
            return (
                <button onClick={this.playTrack}>
                    <img src={require('./playButton.png')} />
                </button>
            )
        }
    }

    render() {
        return(
            <div className="Track">
                {this.renderPlay()}
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;