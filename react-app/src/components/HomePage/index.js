import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from '../LoginFormModal'
import SignUpModal from '../SignUpModal/';

function HomePage() {
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) {
        history.push("/users")
    }

    return (
        <div>
            <div>
                <LoginFormModal />
                <SignUpModal />
            </div>
            <h2>Welcome to Nimbus Noise</h2>
        </div>
    )
}

export default HomePage;
