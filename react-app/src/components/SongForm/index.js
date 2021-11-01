import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAlbum } from "../../store/albums";
import { addSongThunk } from '../../store/songs';
import { FaFileAudio } from 'react-icons/fa';

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
    const [songPath, setSongPath] = useState("Current File:");
    const [songAlbum, setAlbum] = useState("");
    const [errors, setErrors] = useState([]);


    if (!sessionUser) {
        history.push("/");
    }

    useEffect(() => {
        dispatch(getAlbum())
    }, [dispatch])

    const addSong = async (e) => {
        e.preventDefault();

        setErrors([]);

        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        formData.append("song_file", song);
        formData.append("title", title);
        formData.append("album_id", songAlbum);

        let res = await dispatch(addSongThunk(formData));

        if (res.ok) {
            return history.push(`/songs/${res.id}`);
        } else {
            const { errors } = res;
            setErrors(errors);
            return;
        }
    }

    const updateSong = (e) => {
        const file = e.target.files[0];
        setSong(file);
        const path = e.target.value.split("\\");
        const fileName = path[path.length - 1];
        setSongPath("Current File: " + fileName);
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
                    {/* {errors.map((error, ind) => (
                        <div key={ind} className={css.errors}>{error}</div>
                    ))} */}
                    <div>
                        {errors && errors.map((error, ind) => (
                            <div key={ind} className={css.errors}>{error}</div>
                        ))}
                    </div>
                    <div>
                        <label className={css.file_input}
                            htmlFor="song_upload"><FaFileAudio /></label>
                        <input
                            id="song_upload"
                            type="file"
                            accept="mp3/*"
                            onChange={updateSong}
                        />
                        <div className={css.song_file_pathname}>{songPath}</div>
                    </div>
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
                    <div className={css.button_container}>
                        <button className={css.button}>Upload</button>
                        <Link to={`/users/${sessionUser.id}`}>Cancel</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default SongForm;
