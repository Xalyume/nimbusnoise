import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommentThunk } from "../../store/comments";
import DeleteCommentModal from "../DeleteCommentModal";
import EditCommentModal from '../EditCommentModal';

import css from './Comments.module.css'

function Comments({ songId }) {
    const dispatch = useDispatch();

    const currentUser = useSelector((state) => state.session.user);
    const commentList = useSelector((state) => state.comments);

    useEffect(() => {
        dispatch(getCommentThunk());
    }, [dispatch]);


    let songComments;
    if (commentList) {
        let songArr = Object.values(commentList);

        songComments = songArr.filter((comment) => comment["song_id"] === parseInt(songId));

        const commentsSection = Object.values(songComments)?.map((comment) => {

            return (
                <div key={comment.id} className={css.comment_container}>
                    <div className={css.inner_container}>
                        <div>
                            <Link
                                to={`/users/${comment.user_id}`}
                                className={css.username}
                            >
                                {comment.user.username}
                            </Link>
                            <span className={css.comment_content}> {comment.content}</span>
                        </div>
                        <div>
                            {currentUser && currentUser.id === comment.user_id && (
                                <div className={css.edit_delete}>
                                    <EditCommentModal comment={comment} />
                                    <DeleteCommentModal comment={comment} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={css.date}>
                        On {comment?.created_at}
                    </div>
                </div>
            );
        });

        return (
            <>
                {commentsSection}
            </>
        );
    }

}

export default Comments
