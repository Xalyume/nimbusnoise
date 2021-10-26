import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSong from './EditSong'

function EditSongModal({ song }) {
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
                    <EditSong onClose={onClose} song={song} />
                </Modal>
            )}
        </>
    );
}

export default EditSongModal;
