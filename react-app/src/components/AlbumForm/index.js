import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAlbum } from '../../store/album'

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
                    image_url: "https://lh3.googleusercontent.com/proxy/AvnlljwuafIwyzr2uOvRxXxRNE71VEx_V3tcXknUPeQtJEc7fx3i3VlO4UJEhiQyJhZSz6BjRV5mI0kgEvvAnpT1pVuIYcnl510NQZBQbkVJb6rHHBP1LaQ38wHZtaJA_bkNyadxtZlJuTYLtAvQ1FQS",
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
                history.push('/users')
            }
        }
    }

    return (
        <div>
            <form onSubmit={submitAlbum}>
                <label>Title</label>
                <input value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Album Image</label>
                <input value={albumImage}
                    onChange={(e) => setAlbumImage(e.target.value)}
                />
                <button type="submit">
                    Add Album
                </button>
                <Link to='/users'>Cancel</Link>
            </form>
        </div>
    )
}

export default AlbumForm;
