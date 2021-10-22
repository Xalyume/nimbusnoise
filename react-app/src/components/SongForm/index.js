import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAlbum } from "../../store/albums";
import { addSongThunk } from '../../store/songs';

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

        let res = await dispatch(addSongThunk(formData));
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
        <div>
            <form onSubmit={addSong}>
                <h3>Upload a Song</h3>
                {error && <h3>{error}</h3>}
                <label>Add Song</label>
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
                <button>Upload</button>
                <Link to='/users'>Cancel</Link>
            </form>
        </div>
    )
}

export default SongForm;
