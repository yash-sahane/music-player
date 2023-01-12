import React, { useEffect } from 'react'

const Player = ({ songs, setCurrentSong, currentSong, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, setSongs}) => {
  
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) { // check if id  from all songs is equal to id of the current song 
        // if it is true then return all info of song and active: true to newSongs
        return {
          ...song,
          active: true,
        }
      } else {
        // if id of song which we clicked on is not equal to id of all songs of state then change active:false
        return {
          ...song,
          active: false,
        }
      }
    })
    // finally set song with newly created song ie newSongs
    setSongs(newSongs)
  },[currentSong])

  // to play and pause the audio
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause(); // audioRef is declared 
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }

  // to play previous or next song
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => currentSong.id === song.id)
    if (direction === 'fa-forward-step') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } else {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
      }
      else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]); 
      }
    }
    if(isPlaying) audioRef.current.play()
  }

  // to remove the current song's float value
  const getTime = (time) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  }

  // when range gets dragged this function will set current time of audio as per range and also update inside the state for visualize
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({...songInfo, currentTime: e.target.value})
  }

  const trackAnim = {
    transform : `translateX(${songInfo.animationPercentage}%)`
  }

  return (
    <div className='player'>
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)} </p>
        <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
          <input type="range" min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler} />
          <div style={trackAnim} className="animate-track"> </div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'} </p>
      </div>
      <div className="play-control">
        <i className="fa-solid fa-backward-step" onClick={() => skipTrackHandler('fa-backward-step')}></i>
        <i className={isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play'} onClick={playSongHandler}></i>
        <i className="fa-solid fa-forward-step" onClick={() => skipTrackHandler('fa-forward-step')}></i>
      </div>
    </div>
  )
}

export default Player