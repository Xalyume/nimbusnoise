import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlbum } from "../../store/albums";
import { getSongThunk } from '../../store/songs';

import css from './AlbumPage.module.css';

function AlbumPage() {
    const dispatch = useDispatch()
    const albums = useSelector((state) => state.albums)
    const userList = useSelector((state) => state.users);

    const { albumId } = useParams();

    const album = albums[albumId];

    let user;
    if (album) {
        const userId = album["user_id"];
        user = userList[userId];
    }

    const newDate = album?.created_at.split(" ");

    useEffect(() => {
        dispatch(getAlbum())
    }, [dispatch])

    useEffect(() => {
        dispatch(getSongThunk())
    }, [dispatch])

    if (!album) return null;

    return (
        <>
            <div className={css.album_info_card}>
                <div className={css.left_container}>
                    <div>
                        <h2 className={css.album_tag}>{album.title}</h2>
                        <p> Added by: <Link to={`/users/${user?.id}`}>{user?.username}</Link></p>
                        <p className={css.date_tag}>Created At: {newDate[2]} {newDate[1]}, {newDate[3]} </p>
                    </div>
                    <div>
                        Number of Songs: {Object.values(album["songs"]).length}
                    </div>
                </div>
                <div
                    alt="album_picture"
                    style={{
                        backgroundImage: `url(${album.image_url})`,
                    }}
                    className={css.album_picture}
                ></div>
            </div>
            <fieldset className={css.songs_container}>
                <legend>Songlist:</legend>
                {Object.values(album["songs"]).map((song, index) => (
                    <li key={song.id}>
                        <span className={css.track_num}>Track {index + 1}: </span>
                        <Link
                            to={`/songs/${song.id}`}
                            className={css.song_title}>
                            {song.title}
                        </Link>
                    </li>
                ))}
            </fieldset>
        </>
    )
}

export default AlbumPage;
