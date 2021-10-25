import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAlbum } from '../../store/albums';

import css from './AlbumForm.module.css'

function AlbumForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);

    const [title, setTitle] = useState("");
    const [albumImage, setAlbumImage] = useState("")

    if (!sessionUser) {
        history.push("/");
    }

    const submitAlbum = async (e) => {
        e.preventDefault();

        let album;
        if (title) {
            if (!albumImage) {
                album = {
                    user_id: sessionUser.id,
                    title: title,
                    image_url: "http://res.cloudinary.com/reverb-lp/image/upload/c_limit,f_auto,h_1200,w_1200/v1/v2/images/066f02d0-f80b-4005-bcf1-eb4883c78e29",
                };
            } else {
                album = {
                    user_id: sessionUser.id,
                    title: title,
                    image_url: albumImage,
                };
            }

            let res = await dispatch(addAlbum(album));

            if (res) {
                history.push(`/albums/${res.id}`)
            }
        }
    }

    return (
        <div className={css.form_container}>
            <div className={css.form_inner}>
                <h3>Add An Album:</h3>
                <form onSubmit={submitAlbum}
                    className={css.album_form}>
                    <label>Title</label>
                    <input value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Album Image</label>
                    <input value={albumImage}
                        onChange={(e) => setAlbumImage(e.target.value)}
                    />
                    <div className={css.button_container}>
                        <button type="submit">
                            Add Album
                        </button>
                        <Link to='/users'>Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AlbumForm;
