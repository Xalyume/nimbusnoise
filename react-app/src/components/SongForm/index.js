import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function SongForm() {
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);

    const [title, setTitle] = useState("");
    const [song, setSong] = useState(null);
    const [album, setAlbum] = useState("");

    if (!sessionUser) {
        history.push("/");
    }

    const addSong = (e) => {
        e.preventDefault();

        
    }

    return (
        <div>
            <form onSubmit={addSong}>
                <label>Add Song</label>
                <input
                    id="song_upload"
                    type="file"
                    accept="mp3/*"
                    onChange={setSong}
                />
                <input />
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
                </select>
                <button>Upload</button>
                <Link to='/users'>Cancel</Link>
            </form>
        </div>
    )
}

export default SongForm;
