import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAlbum } from "../../store/albums";
import { getSongThunk } from '../../store/songs';
import { getUsers } from '../../store/users';

import css from './User.module.css'

function User() {
	const dispatch = useDispatch();
	// const [user, setUser] = useState({});
	const { userId } = useParams();

	const albums = useSelector((state) => state.albums);
	const songs = useSelector((state) => state.songs);
	const users = useSelector((state) => state.users);

	const userArr = Object.values(users)
	const user = userArr.find(user => user.id === parseInt(userId));

	const userAlbums = (Object.values(albums)).filter(album => album.user_id === parseInt(userId));
	const userSongs = (Object.values(songs)).filter(song => song.user_id === parseInt(userId));

	// useEffect(() => {
	// 	if (!userId) {
	// 		return;
	// 	}
	// 	(async () => {
	// 		const response = await fetch(`/api/users/${userId}`);
	// 		const user = await response.json();
	// 		await setUser(user);
	// 	})();
	// }, [userId]);

	useEffect(() => {
		dispatch(getAlbum())
	}, [dispatch])

	useEffect(() => {
		dispatch(getSongThunk())
	}, [dispatch])

	useEffect(() => {
		dispatch(getUsers())
	}, [dispatch])

	const newDate = user?.created_at.split(" ");

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
					<strong>Member Since:</strong> {newDate[2]} {newDate[1]}, {newDate[3]}
				</div>
			</div>
			<div className={css.user_media_container}>
				<div className={css.albums_container}>
					<fieldset className={css.fieldsets}>
						<legend className={css.song_album}>User's Albums:</legend>
						<div className={css.albums_display_container}>
							{userAlbums.map((album) => (
								<li key={album.id}>
									<Link
										to={`/albums/${album.id}`}>
										<div className={css.single_album_container}>
											<div
												alt="album_picture"
												style={{
													backgroundImage: `url(${album.image_url})`,
												}}
												className={css.album_picture}
											></div>
											<span className={css.album_titles}>
												{album.title}
											</span>
										</div>
									</Link>
								</li>
							))}
						</div>
					</fieldset>
				</div>
				<div className={css.songs_container}>
					<fieldset className={css.fieldsets_songs}>
						<legend className={css.song_album}>
							User's Songs:
						</legend>
						{userSongs.map((song) => (
							<li key={song.id}
								className={css.song}>
								<Link
									to={`/songs/${song.id}`}>
									{song.title}
								</Link>
							</li>
						))}
					</fieldset>
				</div>
			</div>
		</div>
	);
}
export default User;
