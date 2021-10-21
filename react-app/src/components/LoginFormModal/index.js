import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

import css from './Login.module.css'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    const onClose = () => setShowModal(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}
            className={css.auth_button}>Log In</button>
            {showModal && (
                <Modal onClose={onClose}>
                    <LoginForm onClose={onClose}/>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
