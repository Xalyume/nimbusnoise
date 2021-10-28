import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCommentThunk } from '../../store/comments';

import css from './DeleteComment.module.css'

const DeleteComment = ({ onClose, comment }) => {
    const dispatch = useDispatch();

    const deleteFunc = async () => {
        const toDelete = comment.id

        dispatch(deleteCommentThunk(toDelete))
        onClose()
    }

    return (
        <div className={css.delete_container}>
            <p className={css.text_message}>Are you sure you want to delete your comment?</p>
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

export default DeleteComment;
