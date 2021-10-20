
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal'
import SignUpModal from './SignUpModal/';

const NavBar = () => {
  const currentUser = useSelector((state) => state.session.user);

  const loggedIn = () => {
    if (currentUser) {
      return (
        <>
          <li>
            <LogoutButton />
          </li>
          <li>
            Username: {currentUser.username}
          </li>
        </>
      )
    } else {
      return (
        <>
          <li>
            <LoginFormModal />
          </li>
          <li>
            <SignUpModal />
          </li>
        </>
      )
    }
  }

  return (
    <nav>
      <li>
        <NavLink to='/' exact={true} activeClassName='active'>
          Nimbus Noise
        </NavLink>
      </li>
      <li>
        <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink>
      </li>
      {loggedIn()}
    </nav>
  );
}

export default NavBar;
