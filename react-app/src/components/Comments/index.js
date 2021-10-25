import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCommentThunk } from "../../store/comments";
import DeleteCommentModal from "../DeleteCommentModal";

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
            const newDate = comment?.created_at.split(" ");

            return (
                <div key={comment.id}>
                    <div>
                        <div>
                            <div>
                                <Link
                                    to={`/users/${comment.user_id}`}
                                >
                                    {comment.user.username}
                                </Link>
                                <div>{comment.content}</div>
                            </div>
                        </div>
                        <div>
                            {currentUser && currentUser.id === comment.user_id && (
                                <div>
                                    <p>Edit</p>
                                    <DeleteCommentModal />
                                </div>
                            )}
                        </div>
                    </div>
                    {newDate[2]} {newDate[1]}, {newDate[3]}
                </div>
            );
        });

        if (!commentList) {
            return (
                <p>This song currently has no comments</p>
            );
        } else {
            return (<>
                {commentsSection}
            </>);
        }
    }

}

export default Comments
