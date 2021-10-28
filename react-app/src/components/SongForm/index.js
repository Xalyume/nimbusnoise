import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAlbum } from "../../store/albums";
import { addSongThunk } from '../../store/songs';

import css from './SongForm.module.css'

function SongForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albums);

    const albumArr = Object.values(albums)
    const userAlbum = albumArr.filter(album => album["user_id"] === sessionUser.id)

    const [title, setTitle] = useState("");
    const [song, setSong] = useState(null);
    const [songAlbum, setAlbum] = useState("");
    const [error, setError] = useState("");


    if (!sessionUser) {
        history.push("/");
    }

    useEffect(() => {
        dispatch(getAlbum())
    }, [dispatch])

    const addSong = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        formData.append("song_file", song);
        formData.append("title", title);
        formData.append("album_id", songAlbum);

        console.log(sessionUser.id)
        console.log(song)
        console.log(title)
        console.log(songAlbum)

        let res = await dispatch(addSongThunk(formData));
        console.log(res);

        if (res.ok) {
            return history.push(`/songs/${res.id}`);
        } else {
            // res returns an errors stirng, display it
            const { errors } = res;
            setError(errors);
            return;
        }
    }

    const updateSong = (e) => {
        const file = e.target.files[0];
        setSong(file);
    }

    return (
        <div className={css.form_container}>
            <div className={css.form_inner}>
                <div className={css.card_upper}>
                    <h1 className={css.app_name}>Nimbus Noise</h1>
                    <h3>Upload a New Song</h3>
                </div>
                <form onSubmit={addSong}
                    className={css.album_form}>
                    {error && <p className={css.error}>{error}</p>}
                    <label>Song File</label>
                    <input
                        id="song_upload"
                        type="file"
                        accept="mp3/*"
                        onChange={updateSong}
                    />
                    <label>Title</label>
                    <input type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                    <label>Album</label>
                    <select name="slices"
                        onChange={(e) => setAlbum(e.target.value)}
                        className={css.select_menu}
                    >
                        <option value={null}
                            disabled="disabled"
                            selected
                        >Pick an album.</option>
                        {userAlbum.map((album) => (
                            <option
                                value={album.id}
                                key={album.id}>
                                {album.title}
                            </option>
                        ))}
                    </select>
                    <div className={css.button_container }>
                        <button className={css.button}>Upload</button>
                        <Link to={`/users/${sessionUser.id}`}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SongForm;
