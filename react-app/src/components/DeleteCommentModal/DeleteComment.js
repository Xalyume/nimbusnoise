import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../store/comments';

const DeleteComment = ({ onClose, comment }) => {
    const dispatch = useDispatch();

    const deleteFunc = async () => {
        const toDelete = comment.id

        dispatch(deleteCommentThunk(toDelete))
        onClose()
    }

    return (
        <div>
            <h2>Are you sure you want to delete this slice?</h2>
            <div>
                <button
                    onClick={deleteFunc}>Confirm</button>
                <button
                    onClick={onClose}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteComment;
