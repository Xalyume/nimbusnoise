import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAlbum } from "../../store/albums";
import { getSongThunk } from '../../store/songs'

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
            <div>
                <h2>{album.title}</h2>
                <p>Created At: {newDate[2]} {newDate[1]}, {newDate[3]} </p>
                <img src={album.image_url} alt="album_cover" />
            </div>
            <div>
                {Object.values(album["songs"]).map((song) => (
                    <li>
                        <Link
                            key={song.id}
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
