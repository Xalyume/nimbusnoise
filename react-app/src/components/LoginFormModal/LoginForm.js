import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
// import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import css from './Login.module.css'

const LoginForm = ({ onClose }) => {
    const history = useHistory()

    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            onClose()
            history.push("/users")
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    // if (user) {
    //   return <Redirect to='/' />;
    // }

    const demo = async (e) => {
        e.preventDefault();

        await dispatch(login("demo@aa.io", "password"));
        history.push("/users");
    };

    return (
        <>
            <form onSubmit={onLogin}
                className={css.login_form}>
                <div className={css.title_tag}>Log into Nimbus Noise</div>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind} className={css.errors}>{error}</div>
                    ))}
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        name='email'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={updateEmail}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        name='password'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={updatePassword}
                    />
                </div>
                <button type='submit'>Login</button>
                <button onClick={demo}>Demo User</button>
            </form>
        </>
    );
};

export default LoginForm;
