import React from 'react'

const Nav = ({ libraryStatus, setLibraryStatus }) => {
    return (
        <nav className='navigation-bar'>
            <h1 className='nav-heading'>Waves</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}
                className='nav-button'>Libary
                <i className="fa-solid fa-bars"></i>
            </button>
        </nav>
    )
}

export default Nav