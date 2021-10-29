import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from '../LoginFormModal'
import SignUpModal from '../SignUpModal/';
import { BsGithub, BsLinkedin, BsClouds } from 'react-icons/bs';

import css from './HomePage.module.css'

function HomePage() {
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) {
        history.push(`/users/${sessionUser.id}`)
    }

    return (
        <div>
            <div className={css.outter_upper_container}
                alt="album_picture"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1556196148-1fb724238998?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lcyUyMGxhcHRvcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80)`,
                }}
            >
                <div className={css.top_container}>
                    <div>
                        <p className={css.left_logo}>Nimbus Noise</p>
                    </div>
                    <div className={css.right_container}>
                        <LoginFormModal />
                        <SignUpModal />
                    </div>
                </div>
                <h1 className={css.central_text}>Nimbus Noise</h1>
            </div>
            <div className={css.center_div}>
                <h1 className={css.welcome}>Welcome to Nimbus Noise!</h1>
                <p className={css.text}>At Nimbus Noise, we strive to help people connect through music</p>
                <p className={css.text}>Users can add their own albums and songs and play them directly on the site!</p>
                <p className={css.text}>Additioanally, users can visit other users' pages and listen to the songs they've uploaded and leave comments.</p>
                <br />
                <p className={css.text2}>Come join Nimbus Noise and share your music as well as discover new music today!!</p>
                <br />
                <p className={css.cloud_icon}>
                    <BsClouds />
                </p>
            </div>
            <footer className={css.github_linkedin}>
                <div className={css.inner_link_container}>
                    <a
                        className={css.links}
                        href="httdivs://github.com/Xalyume/"><BsGithub /></a>
                    <a
                        className={css.links}
                        href="https://www.linkedin.com/in/william-h-jang/"><BsLinkedin /></a>
                </div>
            </footer>
        </div>
    )
}

export default HomePage;
