import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteSong from './DeleteSong';

function DeleteSongModal({ song }) {
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
                    <DeleteSong onClose={onClose} song={song} />
                </Modal>
            )}
        </>
    );
}

export default DeleteSongModal;
