import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useCurrentSong } from '../../context/SongPlayer'

import css from './auth.module.css'

const LogoutButton = () => {
	const history = useHistory();
	const { setCurrentSong } = useCurrentSong();

	const dispatch = useDispatch()
	const onLogout = async (e) => {
		await dispatch(logout());
		await setCurrentSong("");
		history.push('/')
	};

	return <button onClick={onLogout}
		className={css.drop_text}
	>Logout</button>;
};

export default LogoutButton;
