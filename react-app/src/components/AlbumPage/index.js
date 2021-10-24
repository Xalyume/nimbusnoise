import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlbum } from "../../store/albums";
import { getSongThunk } from '../../store/songs';

import css from './AlbumPage.module.css';

function AlbumPage() {
    const dispatch = useDispatch()
    const albums = useSelector((state) => state.albums)
    const { albumId } = useParams();

    const album = albums[albumId]

    // const songArr = Object.values(album["songs"])

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
                <div>
                    <h2 className={css.album_tag}>{album.title}</h2>
                    <p className={css.date_tag}>Created At: {newDate[2]} {newDate[1]}, {newDate[3]} </p>
                </div>
                <div>
                    <img src={album.image_url} alt="album_cover" />
                </div>
            </div>
            <div className={css.songs_container}>
                <p>Songs in this Album:</p>
                {Object.values(album["songs"]).map((song) => (
                    <li key={song.id}>
                        <Link
                            to={`/songs/${song.id}`}>
                            {song.title}
                        </Link>
                    </li>
                ))}
            </div>
        </>
    )
}

export default AlbumPage;
