import React, { useRef, useState, useEffect } from 'react'
import './MusicPlayer.css'
import song1 from "../music/music1.mp3"
import song2 from "../music/@SaiAbhyankkar - Pavazha Malli (Music Video)  Kayadu  Shruti Haasan  Vivek  Thejo Think Indie.mp3"
import img1 from "../assets/image1.gif"  
// import img2 from "../assets/image2.gif"

const MusicPlayer = () => {
    const musicPlaylist = [
        {
            name: "sorry sorry",
            artist: "",
            src: song1,
            cover: img1
        },
        {
            name: "Pavazha Malli",
            artist: "Sai Abhyankkar",
            src: song2,
            cover: img1
        }
    ];

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const currentSong = musicPlaylist[currentSongIndex];

    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleProgressChange = (e) => {
        if (audioRef.current) {
            const newTime = Number(e.target.value);
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Auto-load and play when track index changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            if (isPlaying) {
                audioRef.current.play().catch(err => console.log("Playback blocked:", err));
            }
        }
    }, [currentSongIndex]);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    };

    const nextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % musicPlaylist.length);
    };

    const prevSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + musicPlaylist.length) % musicPlaylist.length);
    };
    const changeVolume = (e) => {
        if (audioRef.current) {
            audioRef.current.volume = e.target.value / 100;
        }
    };
  return (
    <div className="player-wrapper">
      <div className="music-contenor">
        {/* Glow Effects for Visual Depth */}
        <div className="glow-circle glow-1"></div>
        <div className="glow-circle glow-2"></div>
        
        {/* Header Title */}
        <div className="player-header">
          <span className="now-playing-badge">NOW PLAYING</span>
          <h2 className="player-title">Retro Fusion</h2>
        </div>

        {/* Album Art Section */}
        <div className="album-art-container">
          <img className="album-art" src={currentSong.cover} alt="Album Cover" />
          <div className="vinyl-overlay"></div>
        </div>

        {/* Song & Artist Info */}
        <div className="song-info">
          <h3 className="song-name">{currentSong.name}</h3>
          <p className="artist-name">{currentSong.artist}</p>
        </div>

        {/* Timeline Progress Bar */}
        <div className="progress-section">
          <div className="progress-container">
            <input 
              type="range" 
              className="progress-bar" 
              min="0" 
              max={duration || 100} 
              value={currentTime} 
              onChange={handleProgressChange} 
            />
          </div>
          <div className="time-display">
            <span className="time-current">{formatTime(currentTime)}</span>
            <span className="time-total">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controller Section */}
        <div className="controler">
          <button className="control-btn prev-btn" title="Previous" aria-label="Previous" onClick={prevSong}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6L18 6v12z"/>
            </svg>
          </button>
          
          <button className="control-btn stop-btn" title="Stop" aria-label="Stop" onClick={stop}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="1.5" />
            </svg>
          </button>

          <button className="control-btn play-btn" title="Play" aria-label="Play" onClick={play}>
            <div className="play-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </button>

          <button className="control-btn pause-btn" title="Pause" aria-label="Pause" onClick={pause}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>

          <button className="control-btn next-btn" title="Next" aria-label="Next" onClick={nextSong}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6zm9-12v12h2V6z"/>
            </svg>
          </button>

          <audio 
            ref={audioRef} 
            src={currentSong.src}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={nextSong}
          ></audio>
        </div>

        {/* Volume Control Section */}
        <div className="volume-section">
          <div className="volume-label-container">
            <svg className="volume-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <span className="volume-label">Volume</span>
          </div>
          <input type="range" className="volume-slider" min="0" max="100" defaultValue="70" onChange={changeVolume} />
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer