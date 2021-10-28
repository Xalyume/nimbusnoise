import React, { useEffect, useState } from "react";
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

import { BsFillPlayCircleFill } from 'react-icons/bs'

import css from './SongPage.module.css'

function SongPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();
    const { setCurrentSong } = useCurrentSong();

    const songs = useSelector((state) => state.songs);
    const albums = useSelector((state) => state.albums);
    const sessionUser = useSelector((state) => state.session.user);
    const userList = useSelector((state) => state.users);

    const song = songs[songId];
    let user;
    if (song) {
        const userId = song["user_id"];
        user = userList[userId];
    }

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
        dispatch(getUsers())
    }, [dispatch])

    useEffect(() => {
        if (sessionUser?.id) {
            if (sessionUser?.id === song?.user_id) {
                setEditButtons(true);
            }
        }
    }, [sessionUser?.id, song?.user_id]);

    const playSong = async () => {
        await setCurrentSong(song?.song_file);
        const audio = document.getElementById("media_player");
        audio.play();
    }

    const addComment = async (e) => {
        e.preventDefault();

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

    if (!song) return null;

    return (
        <>
            <div className={css.song_outer}>
                <div className={css.song_info_card}>
                    <div className={css.play_container}>
                        <button onClick={playSong}
                            className={css.play_button}>
                            <BsFillPlayCircleFill />
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
                    <p className={css.album_title}>Album:{songAlbum?.title}</p>
                </div>
            </div>
            <div className={css.add_comment}>
                <div>
                    <form onSubmit={addComment}>
                        <input
                            placeholder='Add a comment'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className={css.add_input} />
                        <button
                            type="submit"
                        >Add a Comment</button>
                    </form>
                </div>
            </div>
            <div className={css.comments_container}>
                <Comments songId={songId} />
            </div>
        </>
    )
}

export default SongPage;
