import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from '../LoginFormModal'
import SignUpModal from '../SignUpModal/';
import { BsGithub, BsLinkedin } from 'react-icons/bs';

import css from './HomePage.module.css'

function HomePage() {
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) {
        history.push("/users")
    }

    return (
        <div>
            <div className={css.top_container}
                alt="album_picture"
                style={{
                    backgroundImage: `url(https://picjumbo.com/wp-content/uploads/listening-streaming-music-from-laptop-in-bed-2210x1473.jpg)`,
                }}
            >
                <div>
                    <h1>Nimbus Noise</h1>
                </div>
                <div className={css.right_container}>
                    <LoginFormModal />
                    <SignUpModal />
                </div>
            </div>
            <div className={css.center_div}>
                <h1 className={css.welcome}>Welcome to Nimbus Noise!</h1>
                <p className={css.text}>At Nimbus Noise, we strive to help people connect through music</p>
                <p className={css.text}>Come share your music and discover new music!</p>
                <div
                    alt="album_picture"
                    style={{
                        backgroundImage: `url(https://images.theconversation.com/files/296814/original/file-20191014-135509-xpdud2.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip)`,
                    }}
                    className={css.middle_picture}
                ></div>
            </div>
            <div className={css.github_linkedin}>
                <p className={css.inner_link_container}>
                    <a
                        className={css.links}
                        href="https://github.com/Xalyume/"><BsGithub /></a>
                    <a
                        className={css.links}
                        href="https://www.linkedin.com/in/william-h-jang/"><BsLinkedin /></a>
                </p>
            </div>
        </div>
    )
}

export default HomePage;
