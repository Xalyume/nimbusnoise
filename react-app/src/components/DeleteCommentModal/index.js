import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteComment from './DeleteComment';

import css from './DeleteComment.module.css'

function DeleteCommentModal({ comment }) {
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
                className={css.btn}
            >Delete</button>
            {showModal && (
                <Modal onClose={onClose}>
                    <DeleteComment onClose={onClose} comment={comment} />
                </Modal>
            )}
        </>
    );
}

export default DeleteCommentModal;
