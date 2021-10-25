import React from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { delSongThunk } from '../../store/songs';

const DeleteComment = ({ onClose, song }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteFunc = async () => {
        const toDelete = song.id;

        dispatch(delSongThunk(toDelete));
        history.push(`/users`);
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
