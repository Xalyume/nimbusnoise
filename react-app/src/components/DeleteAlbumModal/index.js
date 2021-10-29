import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteAlbum from './DeleteAlbum';

import css from './DeleteAlbum.module.css'

function DeleteAlbumModal({ album }) {
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
            >Delete this Album</button>
            {showModal && (
                <Modal onClose={onClose}>
                    <DeleteAlbum onClose={onClose} album={album} />
                </Modal>
            )}
        </>
    );
}

export default DeleteAlbumModal;
