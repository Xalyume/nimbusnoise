import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAlbum } from "../../store/albums";
import { getSongThunk } from '../../store/songs';

import css from './User.module.css'

function User() {
	const dispatch = useDispatch();
	const [user, setUser] = useState({});
	const { userId } = useParams();

	const albums = useSelector((state) => state.albums)
	const songs = useSelector((state) => state.songs)

	const userAlbums = (Object.values(albums)).filter(album => album.user_id === parseInt(userId));
	const userSongs = (Object.values(songs)).filter(song => song.user_id === parseInt(userId));

	useEffect(() => {
		if (!userId) {
			return;
		}
		(async () => {
			const response = await fetch(`/api/users/${userId}`);
			const user = await response.json();
			setUser(user);
		})();
	}, [userId]);

	useEffect(() => {
		dispatch(getAlbum())
	}, [dispatch])

	useEffect(() => {
		dispatch(getSongThunk())
	}, [dispatch])


	if (!user) {
		return null;
	}

	return (
		<div>
			<div className={css.user_card_container}>
				<div className={css.username_tag}>
					{user.username}
				</div>
				<div className={css.email_tag}>
					{user.email}
				</div>
				<div className={css.membership_date}>
					<strong>Member Since:</strong> {user.created_at}
				</div>
			</div>
			<div className={css.user_media_container}>
				<div className={css.albums_container}>
					<p className={css.song_album}>User's Albums:</p>
					<div className={css.albums_display_container}>
						{userAlbums.map((album) => (
							<li key={album.id}>
								<Link
									to={`/albums/${album.id}`}>
									<div
										alt="album_picture"
										style={{
											backgroundImage: `url(${album.image_url})`,
										}}
										className={css.album_picture}
									></div>
								</Link>
							</li>
						))}
					</div>
				</div>
				<div className={css.songs_container}>
					<p className={css.song_album}>User's Songs:</p>
					{userSongs.map((song) => (
						<li key={song.id}>
							<Link
								to={`/songs/${song.id}`}>
								{song.title}
							</Link>
						</li>
					))}
				</div>
			</div>
		</div>
	);
}
export default User;
