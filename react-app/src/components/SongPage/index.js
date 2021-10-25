import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongThunk, editSongThunk } from "../../store/songs";
import { getAlbum } from "../../store/albums";
import { addCommentThunk } from '../../store/comments';
import Comments from "../Comments";
import DeleteSongModal from '../DeleteSongModal';

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
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState(""); // TODO: look at getting text prefilled
    const [newComment, setNewComment] = useState("");
    const [, setNewRender] = useState({});

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

    const updateSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: song.id,
            title,
        };

        let res = await dispatch(editSongThunk(payload));
        if (res.ok) {
            setEdit(false);
            song.title = title;
            setNewRender({}) // forcing a rerender after
        }
    };

    const addComment = async(e) => {

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

    const onEdit = () => {
        setEdit(!edit);
    };

    let editDelBtns;
    if (editButtons) {
        editDelBtns = (
            <div>
                <button
                    onClick={onEdit}
                    className={css.edit_btn}
                >Edit</button>
                <DeleteSongModal song={song}/>
            </div>
        );
    }

    let editForm;
    if (edit) {
        editForm = (
            <form onSubmit={updateSubmit}>
                <input
                    type="text"
                    value={title}
                    placeholder={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Update</button>
                <button onClick={() => setEdit(false)}>Cancel</button>
            </form>
        );
    } else {
        editForm = <h2 className={css.song_title}>Song Title: {song?.title}</h2>
    }

    if (!song) return null;

    return (
        <>
            <div className={css.song_info_card}>
                <div>
                    <h3 className={css.album_title}>Album: <Link to={`/albums/${songAlbum?.id}`}>{songAlbum?.title}</Link></h3>
                    <div>
                        {editForm}
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
                <Comments songId={songId}/>
            </div>
        </>
    )
}

export default SongPage;
