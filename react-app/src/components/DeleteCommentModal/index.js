import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteComment from './DeleteComment';

function DeleteCommentModal({ checkin }) {
    const [showModal, setShowModal] = useState(false);

    const onClose = () => {
        setShowModal(false)
    }

    if (showModal === true) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}
            >Delete</button>
            {showModal && (
                <Modal onClose={onClose}>
                    <DeleteComment onClose={onClose} checkin={checkin} />
                </Modal>
            )}
        </>
    );
}

export default DeleteCommentModal;
