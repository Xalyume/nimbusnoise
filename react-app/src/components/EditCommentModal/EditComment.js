import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editCommentThunk } from '../../store/comments';

import css from './EditComment.module.css'

const EditSlice = ({ onClose, comment }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(comment.content);
    const [error, setError] = useState("");

    const updateSubmit = async (e) => {
        e.preventDefault();

        if (!content) {
            setError("Comment field cannot be empty.")
        } else {
            const payload = {
                id: comment.id,
                content,
            };

            let res = await dispatch(editCommentThunk(payload));
            if (res.ok) {
                onClose()
            }
        }
    };

    return (
        <div>
            <h2>Edit your comment</h2>
            <form onSubmit={updateSubmit}>
                {error &&
                    <p className={css.error}>{error}</p>
                }
                <input
                    type="text"
                    value={content}
                    placeholder={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button type="submit">Update</button>
                <button onClick={() => onClose()}>Cancel</button>
            </form>
        </div>
    )
}

export default EditSlice;
