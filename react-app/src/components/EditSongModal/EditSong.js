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
            <h2>Edit your Song's title.</h2>
            <form onSubmit={updateSubmit}>
                {error &&
                    <p className={css.error}>{error}</p>
                }
                <input
                    type="text"
                    value={title}
                    placeholder={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div>
                    <button type="submit">Update</button>
                    <button onClick={() => onClose()}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default EditSlice;
