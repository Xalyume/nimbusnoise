import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCurrentSong } from '../../context/SongPlayer'
import { getSongThunk } from "../../store/songs";
import { getAlbum } from "../../store/albums";
import { addCommentThunk } from '../../store/comments';
import { getUsers } from '../../store/users'
import Comments from "../Comments";
import DeleteSongModal from '../DeleteSongModal';
import EditSongModal from '../EditSongModal';

import css from './SongPage.module.css'

function SongPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();
    const { currentSong, setCurrentSong } = useCurrentSong();
    const playingRef = useRef();

    const songs = useSelector((state) => state.songs);
    const albums = useSelector((state) => state.albums);
    const sessionUser = useSelector((state) => state.session.user);
    const userList = useSelector((state) => state.users);

    const [editButtons, setEditButtons] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState("");

    let user;
    const song = songs[songId];
    const newDate = song?.created_at.split(" ");
    const audio = document.getElementById("media_player");

    const albumArr = Object.values(albums)
    const songAlbum = albumArr.find(album => album["id"] === song["album_id"])

    useEffect(() => {
        dispatch(getSongThunk())
        dispatch(getAlbum())
        dispatch(getUsers())
    }, [dispatch])

    if (song) {
        const userId = song["user_id"];
        user = userList[userId];
    }

    useEffect(() => {
        if (sessionUser?.id) {
            if (sessionUser?.id === song?.user_id) {
                setEditButtons(true);
            }
        }
    }, [sessionUser?.id, song?.user_id]);

    if (Object.keys(songs).length !== 0 && songs[songId] === undefined) {
        history.push("/users");
    }

    if (!song) return null;

    const playSong = async () => {

        if (currentSong === song?.song_file) {
            if (audio.paused === false) {
                audio.pause();
            } else {
                audio.play();
            }
        } else {
            await setCurrentSong(song?.song_file);
            audio.play();
        }
    };

    const addComment = async (e) => {
        e.preventDefault();

        setError("");

        if (!newComment) {
            setError("Please add a comment")
        }

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
            <div className={css.edit_button}>
                <EditSongModal song={song} />
                <DeleteSongModal song={song} />
            </div>
        );
    }

    let addCommentBtn;
    if (sessionUser) {
        addCommentBtn = (
            <form onSubmit={addComment}>
                {error && <p className={css.comment_error}>{error}</p>}
                <input
                    placeholder='Add a comment'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className={css.add_input} />
                <button
                    type="submit"
                    className={css.add_comment}
                >Add a Comment</button>
            </form>
        );
    } else {
        addCommentBtn = (
            <p>You need to log in or sign up to post a comment.</p>
        )
    }

    return (
        <>
            <div className={css.song_outer}>
                <div className={css.song_info_card}>
                    <div className={css.play_container}>
                        <button onClick={playSong}
                            className={`${css.play_button} fas fa-music`}
                            ref={playingRef}
                        >
                            <p className={css.play_pause_text}>
                                Play | Pause
                            </p>
                        </button>
                    </div>
                    <div>
                        <p><Link to={`/users/${user?.id}`}>{user?.username}</Link></p>
                        <div>
                            <h2 className={css.song_title}>{song?.title}</h2>
                        </div>
                        <p className={css.date_tag}>Added On: {newDate[2]} {newDate[1]}, {newDate[3]} </p>
                        <div className={css.edit_btn_container}>
                            {editDelBtns}
                        </div>
                    </div>
                </div>
                <div>
                    <Link to={`/albums/${songAlbum?.id}`}>
                        <div
                            alt="album_picture"
                            style={{
                                backgroundImage: `url(${songAlbum?.image_url})`,
                            }}
                            className={css.album_picture}>
                        </div>
                    </Link>
                    <p className={css.album_title}>{songAlbum?.title}</p>
                </div>
            </div>
            <div className={css.add_comment}>
                <div>
                    {addCommentBtn}
                </div>
            </div>
            <div className={css.comments_header}>
                <h2>Comments:</h2>
                <div className={css.comments_container}>
                    <Comments songId={songId} />
                </div>
            </div>
        </>
    )
}

export default SongPage;
