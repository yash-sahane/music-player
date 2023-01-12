import React from 'react'

const LibrarySong = ({ song, setCurrentSong, songs, audioRef, isPlaying, setSongs, id}) => {
  
  const songSelectHandler = async () => {
    // set current song on which we just clicked on
    await setCurrentSong(song)

    const newSongs = songs.map((song) => {
      if (song.id === id) { // check if id of song on which we clicked on is equal to id from all songs of state
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
    
    if(isPlaying) audioRef.current.play()
  }

  return (
    <div className={`lib-song ${song.active ? 'selected-song' : ''}`} onClick={songSelectHandler}>
        <img src={song.cover} alt='' />
        <div className="song-details">
            <h4>{ song.name }</h4>
            <h5>{ song.artist}</h5>
        </div>
    </div>
  )
}

export default LibrarySong