import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
// import { useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

import css from './Signup.module.css'

const SignUpForm = ({ onClose }) => {
	// const history = useHistory()

	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	// const user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		if (password === repeatPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			}
		} else {
			setErrors(["Passwords must be the same"]);
		}

		// onClose();
		// history.push("/users")
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	// if (user) {
	//   return <Redirect to='/' />;
	// }

	return (
		<form onSubmit={onSignUp} className={css.login_form}>
			<div className={css.title_tag}>Sign up for Nimbus Noise</div>
			<div>
				{errors.map((error, ind) => (
					<div key={ind} className={css.errors}>{error}</div>
				))}
			</div>
			<div>
				<div className={css.labels}>
					<label>User Name</label>
				</div>
				<input
					type='text'
					name='username'
					onChange={updateUsername}
					value={username}
					placeholder="Username"
					className={css.input_bar}
				></input>
			</div>
			<div>
				<div className={css.labels}>
					<label>Email</label>
				</div>
				<input
					type='text'
					name='email'
					onChange={updateEmail}
					value={email}
					placeholder='Email'
					className={css.input_bar}
				></input>
			</div>
			<div>
				<div className={css.labels}>
					<label>Password</label>
				</div>
				<input
					type='password'
					name='password'
					onChange={updatePassword}
					value={password}
					placeholder="Password"
					className={css.input_bar}
				></input>
			</div>
			<div>
				<div className={css.labels}>
					<label>Confirm Password</label>
				</div>
				<input
					type='password'
					name='repeat_password'
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
					placeholder="Confirm Password"
					className={css.input_bar}
				></input>
			</div>
			<div className={css.login_btns}>
				<button type='submit' className={css.btn}>Sign Up</button>
			</div>
		</form>
	);
};

export default SignUpForm;
