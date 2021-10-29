import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editSongThunk } from '../../store/songs';

import css from './EditSong.module.css'

const EditSlice = ({ onClose, song }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(song.title);
    const [error, setError] = useState("");

    const updateSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            setError("Title cannot be empty.")
        } else {
            const payload = {
                id: song.id,
                title,
            }
            let res = await dispatch(editSongThunk(payload));
            if (res.ok) {
                onClose()
            }
        };

    };

    return (
        <div className={css.edit_container}>
            <p className={css.title}>Edit your Song's title.</p>
            <form onSubmit={updateSubmit}>
                {error &&
                    <p className={css.error}>{error}</p>
                }
                <input
                    type="text"
                    value={title}
                    placeholder={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={css.input_bar}
                />
            </form>
            <div className={css.buttons_div}>
                <button type="submit"
                    className={css.edit_btn}>Update</button>
                <button onClick={() => onClose()}
                    className={css.edit_btn}>Cancel</button>
            </div>
        </div>
    )
}

export default EditSlice;
