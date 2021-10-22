import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongThunk } from "../../store/songs";
import { getAlbum } from "../../store/albums";

function SongPage() {
    const dispatch = useDispatch()
    const songs = useSelector((state) => state.songs)
    const albums = useSelector((state) => state.albums)
    const { songId } = useParams();

    const song = songs[songId]

    const albumArr = Object.values(albums)
    const songAlbum = albumArr.find(album => album["id"] === song["album_id"])

    const newDate = song?.created_at.split(" ");

    useEffect(() => {
        dispatch(getSongThunk())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAlbum())
    }, [dispatch])

    if (!song) return null;

    return (
        <>
            <h2>Song Title: {song.title}</h2>
            <h3>Album: <Link to={`/albums/${songAlbum?.id}`}>{songAlbum?.title}</Link></h3>
            <p>Created At: {newDate[2]} {newDate[1]}, {newDate[3]} </p>
        </>
    )
}

export default SongPage;
