import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSongThunk, editSongThunk } from "../../store/songs";
import { getAlbum } from "../../store/albums";

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
    const [, setNewRender] = useState({});

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

    const onDelete = async () => {
        const toDelete = song.id;

        // let res = await dispatch(delSongThunk(toDelete));
        // if (res.ok) {
        //     history.push(`/home`);
        // }
    };

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

    const onEdit = () => {
        setEdit(!edit);
    };

    let editDelBtns;
    if (editButtons) {
        editDelBtns = (
            <div>
                <button
                    onClick={onEdit}
                >Edit</button>
                <button
                    onClick={onDelete}
                >Delete</button>
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
        editForm = <h2>Song Title: {song?.title}</h2>
    }

    if (!song) return null;

    return (
        <>
            {editForm}
            <h3>Album: <Link to={`/albums/${songAlbum?.id}`}>{songAlbum?.title}</Link></h3>
            <p>Created At: {newDate[2]} {newDate[1]}, {newDate[3]} </p>
            <div>
                {editDelBtns}
            </div>
        </>
    )
}

export default SongPage;
