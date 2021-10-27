
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../LoginFormModal'
import SignUpModal from '../SignUpModal';

import css from './NavBar.module.css'

const NavBar = () => {
	const currentUser = useSelector((state) => state.session.user);

	const [uploadMenu, setUploadMenu] = useState(false);
	const [userMenu, setUserMenu] = useState(false);

	const openUserMenu = () => {
		if (userMenu) return;
		setUserMenu(true);
	};

	const openUpload = () => {
		if (uploadMenu) return;
		setUploadMenu(true);
	};

	useEffect(() => {
		if (!userMenu) return;

		const closeMenu = () => {
			setUserMenu(false);
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [userMenu]);

	useEffect(() => {
		if (!uploadMenu) return;

		const closeUpload = () => {
			setUploadMenu(false);
		};

		document.addEventListener("click", closeUpload);

		return () => document.removeEventListener("click", closeUpload);
	}, [uploadMenu]);


	const loggedIn = () => {
		if (currentUser) {
			return (
				<>
					<div className={css.dropdown}>
						<button onClick={openUpload}
							className={css.dropbtn}>
							Upload
						</button>
						{uploadMenu && (
							<div className={css.dropdown_nav}>
								<div className={css.inner_drop}>
									<NavLink to='/add-album'
										className={css.drop_text}>
										Add an Album</NavLink>
								</div>
								<div className={css.inner_drop}>
									<NavLink to='/add-song'
										className={css.drop_text}>
										Upload a Song</NavLink>
								</div>
							</div>
						)}
					</div>
					<div className={css.dropdown}>
						<button onClick={openUserMenu}
							className={css.dropbtn}>
							{currentUser.username}
						</button>
						{userMenu && (
							<div className={css.dropdown_nav}>
								<div className={css.inner_drop}>
									<Link to={`/users/${currentUser.id}`}
										className={css.drop_text}>
										{currentUser.username}
									</Link>
								</div>
								<div className={css.inner_drop}>
									<LogoutButton className={css.drop_text} />
								</div>
							</div>
						)}
					</div>
				</>
			)
		} else {
			return (
				<>
					<div>
						<LoginFormModal />
					</div>
					<div>
						<SignUpModal />
					</div>
				</>
			)
		}
	}

	const loggedInTwo = () => {
		if (currentUser) {
			return (
				<NavLink to='/users' exact={true}
					className={css.app_name}>
					Nimbus Noise
				</NavLink>
			)
		} else {
			return (
				<NavLink to='/' exact={true}
					className={css.app_name}>
					Nimbus Noise
				</NavLink>
			)
		}
	}

	return (
		<div className={css.outer_container}>
			<div className={css.left_container}>
				{loggedInTwo()}
				<NavLink to="/contact-us"
				className={css.contact_us}>Contact Us</NavLink>
			</div>
			<div className={css.right_container}>
				<NavLink to='/users' exact={true} >
					Users
				</NavLink>
				{loggedIn()}
			</div>
		</div>
	);
}

export default NavBar;
