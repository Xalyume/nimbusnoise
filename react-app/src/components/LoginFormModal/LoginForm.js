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
            history.push(`/users/${data.id}`)
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

        const demoUser = await dispatch(login("demo@aa.io", "password"));
        history.push(`/users/${demoUser.id}`)
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
                        className={css.input_bar}
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
                        className={css.input_bar}
                    />
                </div>
                <div className={css.login_btns}>
                    <button type='submit'
                        className={css.btn}>Login</button>
                    <button onClick={demo}
                        className={css.btn}>Demo User</button>
                </div>
            </form>
        </>
    );
};

export default LoginForm;
