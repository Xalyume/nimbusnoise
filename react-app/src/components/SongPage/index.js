import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongThunk } from "../../store/songs";
import { getAlbum } from "../../store/albums";
import { addCommentThunk } from '../../store/comments';
import Comments from "../Comments";
import DeleteSongModal from '../DeleteSongModal';
import EditSongModal from '../EditSongModal';

import css from './SongPage.module.css'

function SongPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const songs = useSelector((state) => state.songs);
    const albums = useSelector((state) => state.albums);
    const sessionUser = useSelector((state) => state.session.user);
    const { songId } = useParams();
    const song = songs[songId]

    const [editButtons, setEditButtons] = useState(false);
    const [newComment, setNewComment] = useState("");
    // const [, setNewRender] = useState({});

    if (Object.keys(songs).length !== 0 && songs[songId] === undefined) {
        history.push("/users");
    }

    const albumArr = Object.values(albums)
    const songAlbum = albumArr.find(album => album["id"] === song["album_id"])

    const newDate = song?.created_at.split(" ");

    useEffect(() => {
        dispatch(getSongThunk())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAlbum())
    }, [dispatch])

    useEffect(() => {
        if (sessionUser?.id) {
            if (sessionUser?.id === song?.user_id) {
                setEditButtons(true); 
            }
        }
    }, [sessionUser?.id, song?.user_id]);

    const addComment = async (e) => {

        const comment = {
            user_id: sessionUser.id,
            song_id: song.id,
            content: newComment
        }

        let res = await dispatch(addCommentThunk(comment));

        if (res) {
            setNewComment("");
        }
    }

    let editDelBtns;
    if (editButtons) {
        editDelBtns = (
            <div>
                <EditSongModal song={song} />
                <DeleteSongModal song={song} />
            </div>
        );
    }

    if (!song) return null;

    return (
        <>
            <div className={css.song_info_card}>
                <div>
                    <h3 className={css.album_title}>Album: <Link to={`/albums/${songAlbum?.id}`}>{songAlbum?.title}</Link></h3>
                    <div>
                        <h2 className={css.song_title}>Song Title: {song?.title}</h2>
                    </div>
                    <p className={css.date_tag}>Added On: {newDate[2]} {newDate[1]}, {newDate[3]} </p>
                </div>
                <div className={css.edit_btn_container}>
                    {editDelBtns}
                </div>
            </div>
            <div className={css.add_comment}>
                <div>
                    <input
                        placeholder='Add a comment'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className={css.add_input} />
                    <button
                        onClick={addComment}
                    >Add a Comment</button>
                </div>
            </div>
            <div className={css.comments_container}>
                <Comments songId={songId} />
            </div>
        </>
    )
}

export default SongPage;
