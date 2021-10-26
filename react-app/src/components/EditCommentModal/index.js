import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from './EditComment'

function EditSongModal({ comment }) {
    const [showModal, setShowModal] = useState(false);

    const onClose = () => setShowModal(false)

    if (showModal === true) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';

    }

    return (
        <>
            <button onClick={() => setShowModal(true)}
            >Edit</button>
            {showModal && (
                <Modal onClose={onClose}>
                    <EditComment onClose={onClose} comment={comment} />
                </Modal>
            )}
        </>
    );
}

export default EditSongModal;
