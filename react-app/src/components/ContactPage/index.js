import React from "react";
import { BsGithub, BsLinkedin } from 'react-icons/bs';

import css from './ContactPage.module.css'

function ContactPage() {
    return (
        <div className={css.outer_container}>
            <div className={css.contact_container}>
                <p className={css.contact}>About Us!</p>
                <p className={css.links}>
                    <a href="https://github.com/Xalyume/nimbusnoise"><BsGithub /> This Project's Repository</a>
                </p>
                <p className={css.links}>
                    <a href="https://github.com/Xalyume/"><BsGithub /> My Github Profile</a>
                </p>
                <p className={css.links}>
                    <a href="https://www.linkedin.com/in/william-h-jang/"><BsLinkedin /> My LinkedIn Profile</a>
                </p>
            </div>
        </div>
    )
}

export default ContactPage;
