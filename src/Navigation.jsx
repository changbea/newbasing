import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { auth, onSocialClick, dbservice, storage } from './serverbase'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import './Navigation.css'

const onLogOutClick = () => auth.signOut();
const checkbox = () => {
  document.getElementById('nav-control').checked = false
}
function Navigation({ isLoggedIn, userObj }) {
  const [open, setOpen] =useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
    console.log(open)
  };

  const handleClickAway = () => {
    setOpen(false);
    console.log(open)
  };

  return(
    <ClickAwayListener onClickAway={handleClickAway}>
              {/* <nav className='navbar'>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>menus
  </button>
              </nav> */}
      <div> 
        <input type="checkbox" id="nav-control" className="nav-control" onClick={handleClick}/>
        <label htmlFor="nav-control" className="toggle-button">
          <div className="wolverine">
            <div className="claws"></div>
          </div>
        </label>
        {isLoggedIn && 
        <nav className="navigation">
          <h1 className='nav-padding'>
            <Link to='/newbasing/' onClick={checkbox}>Home</Link>
          </h1>
          <h1>
            <Link to='/newbasing/profile' onClick={checkbox}>{userObj.displayName}'s Profile</Link>
          </h1>
          <h1>
            <Link to='/newbasing/ranking' onClick={checkbox}>Ranking</Link>
          </h1>
          <h1>
            <Link to="/newbasing/contact" onClick={checkbox}>Contact</Link>
          </h1>
          <h1>
            <Link to="/newbasing/" onClick={() => {
              onLogOutClick()
              checkbox()
            }}>Logout</Link>
          </h1>
        </nav>}
        {!isLoggedIn &&
          <nav className="navigation">
            <h1 className='nav-padding'>
              <Link to='/newbasing/'>Sign In&Up</Link>
            </h1>
            <h1>
              <Link to="/newbasing/contact">Contact</Link>
            </h1>
          </nav>
        }
          {/* <ul className='nav'>
              <li>
              <Link className='menu' to='/'>Home</Link>
              </li>
              <li>
              <Link className='menu' to='/profile'>{userObj.displayName}'s Profile</Link>
              </li>
            </ul> */}
        {/* <h1>Pure CSS3/HTML full screen slide out menu.</h1> */}
        </div>
      </ClickAwayListener>
    )
}

export default Navigation