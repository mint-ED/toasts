import React, { useState, useEffect } from 'react';
//import { Button } from './Button';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const title = "mintED Toasts";

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            {title}
            <i class='fab fa-typo3' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/explorer' className='nav-links' onClick={closeMobileMenu}>
                Explorer
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/viewer'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Viewer
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/explore'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            </li>
          </ul>          
        </div>
      </nav>
    </>
  );
}

export default Navbar;
