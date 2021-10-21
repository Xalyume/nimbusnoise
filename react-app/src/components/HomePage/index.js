import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from '../LoginFormModal'
import SignUpModal from '../SignUpModal/';

import css from './HomePage.module.css'

function HomePage() {
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) {
        history.push("/users")
    }

    return (
        <div>
            <div className={css.top_container}>
                <div>
                    <h2>Nimbus Noise</h2>
                </div>
                <div className={css.right_container}>
                    <LoginFormModal />
                    <SignUpModal />
                </div>
            </div>
        </div>
    )
}

export default HomePage;
