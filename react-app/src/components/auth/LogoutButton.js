import React from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

import css from './auth.module.css'

const LogoutButton = () => {

	const dispatch = useDispatch()
	const onLogout = async (e) => {
		await dispatch(logout());
	};

	return <button onClick={onLogout}
		className={css.drop_text}
	>Logout</button>;
};

export default LogoutButton;
