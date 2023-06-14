import React from 'react'
import { Link } from 'react-router-dom'
import SearchStation from '../../SearchStation'
import '../../styles/Navbar.css'

const Navbar = () => {
  return (
    <div className='name'>
        <button className="logo" onClick={() => { window.location.href = '/' }}>
            Weather Portal
        </button>
        <nav className='item'>
            <ul className='ul'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/news'>News</Link>
                </li>
                <li>
                    <Link to='/developers'>Developers</Link>
                </li>
                <li>
                    <SearchStation/>
                </li>

            </ul>

        </nav>
    </div>
  )
}

export default Navbar