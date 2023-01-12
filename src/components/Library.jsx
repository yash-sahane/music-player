import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}) => {
  return (
      <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
          <h2 className='library-heading'>Library</h2>
          <div className="library-songs">
            {songs.map((song) => <LibrarySong audioRef={audioRef} song={song} setCurrentSong={setCurrentSong} songs={songs} isPlaying={isPlaying} setSongs={setSongs} id={song.id} key={song.id} />)}
          </div>
    </div>
  )
}

export default Library