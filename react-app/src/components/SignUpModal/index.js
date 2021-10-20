import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    const onClose = () => setShowModal(false)

    return (
        <>
            <button onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={onClose}>
                    <SignUpForm onClose={onClose}/>
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;
