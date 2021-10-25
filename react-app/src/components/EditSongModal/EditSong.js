import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editSongThunk } from '../../store/songs';

const EditSlice = ({ onClose, song }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(song.title)

    const updateSubmit = async (e) => {
        // e.preventDefault();

        const payload = {
            id: song.id,
            title,
        };

        let res = await dispatch(editSongThunk(payload));
        if (res.ok) {
            onClose()
        }
    };

    return (
        <form onSubmit={updateSubmit}>
            <input
                type="text"
                value={title}
                placeholder={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Update</button>
            <button onClick={() => onClose()}>Cancel</button>
        </form>
    )
}

export default EditSlice;
