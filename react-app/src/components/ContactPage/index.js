import React from "react";
import { BsGithub, BsLinkedin } from 'react-icons/bs';

import css from './ContactPage.module.css'

function ContactPage() {
    return (
        <div className={css.outer_container}>
            <fieldset className={css.contact_container}>
                <p className={css.links}>
                    <a href="https://github.com/Xalyume/nimbusnoise"><BsGithub /> This Project's Repository</a>
                </p>
                <p className={css.links}>
                    <a href="https://github.com/Xalyume/"><BsGithub /> My Github Profile</a>
                </p>
                <p className={css.links}>
                    <a href="https://www.linkedin.com/in/william-h-jang/"><BsLinkedin /> My LinkedIn Profile</a>
                </p>
                <legend className={css.legends}>Developed by: William Jang</legend>
            </fieldset>
        </div>
    )
}

export default ContactPage;
