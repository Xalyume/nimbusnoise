import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../store/comments';

const DeleteComment = ({ onClose, checkin }) => {
    const dispatch = useDispatch();

    const deleteFunc = async () => {
        const toDelete = checkin.id

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
