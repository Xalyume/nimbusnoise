import React from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { delSongThunk } from '../../store/songs';

import css from './DeleteSong.module.css'

const DeleteSong = ({ onClose, song }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteFunc = async () => {
        const toDelete = song.id;
        // const reDirectUser = song.user_id;

        dispatch(delSongThunk(toDelete));
        history.push(`/users/${song.user_id}`);
    }

    return (
        <div className={css.delete_container}>
            <p className={css.text_message}>Are you sure you want to delete this song?</p>
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

export default DeleteSong;
