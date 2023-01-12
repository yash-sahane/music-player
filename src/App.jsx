import React, { useState, useRef } from 'react';
import './styles/app.scss';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import data from './data';


function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // newly define songInfo to 0 .. so we can use anywhere else
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [libraryStatus, setLibraryStatus] = useState(false);

  // to define all info about song.. this function called when audio tag load
  const timeUpdateHandler = (e) => {
    const currentT = e.target.currentTime;
    const dur = e.target.duration;
    const roundedCurrent = currentT
    const roundedDuration = dur
    const animation = (roundedCurrent / roundedDuration) * 100;
    setSongInfo({ ...songInfo, currentTime: currentT, duration: dur, animationPercentage: animation }); // we are only adding time and duration into previous data
  }

  const songEndedHandler = async () => {
    let currentIndex = songs.findIndex((song) => currentSong.id === song.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play()
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} songInfo={songInfo} setSongInfo={setSongInfo} audioRef={audioRef} songs={songs} setSongs={setSongs} />
      <Library audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setSongs={setSongs} libraryStatus={libraryStatus} />
      <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} onEnded={songEndedHandler} ref={audioRef} src={currentSong.audio} ></audio>
    </div>
  );
}

export default App;
