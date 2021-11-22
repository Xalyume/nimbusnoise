import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteAlbumThunk } from '../../store/albums';

import css from './DeleteAlbum.module.css'

const DeleteAlbum = ({ onClose, album }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteFunc = async () => {
        const toDelete = album.id

        await dispatch(deleteAlbumThunk(toDelete));
        history.push(`/users/${album.user_id}`);
    }

    return (
        <div className={css.delete_container}>
            <p className={css.text_message}>Are you sure you want to delete this album?</p>
            <div className={css.edit_del_btns}>
                <button
                    onClick={deleteFunc}
                    className={css.confirm_btn}>Yes</button>
                <button
                    onClick={onClose}
                    className={css.confirm_btn}>No</button>
            </div>
        </div>
    )
}

export default DeleteAlbum;
