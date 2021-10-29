import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavBar from './components/NavBar';
import UsersList from './components/UsersList';
import User from './components/User';
import AlbumForm from './components/AlbumForm';
import SongForm from './components/SongForm';
import HomePage from './components/HomePage';
import AlbumPage from './components/AlbumPage';
import SongPage from './components/SongPage';
import ContactPage from './components/ContactPage'
import FooterMediaPlayer from './components/FooterMediaPlayer';
import PageNotFound from './components/PageNotFound'
import { authenticate } from './store/session';

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact={true}>
					<HomePage />
				</Route>
				<Route path='/users' exact={true} >
					<NavBar />
					<UsersList />
					<FooterMediaPlayer />
				</Route>
				<Route path='/users/:userId' exact={true} >
					<NavBar />
					<User />
					<FooterMediaPlayer />
				</Route>
				<ProtectedRoute path='/add-album' exact={true}>
					<NavBar />
					<AlbumForm />
					<FooterMediaPlayer />
				</ProtectedRoute>
				<ProtectedRoute path='/add-song' exact={true}>
					<NavBar />
					<SongForm />
					<FooterMediaPlayer />
				</ProtectedRoute>
				<Route path='/albums/:albumId' exact={true}>
					<NavBar />
					<AlbumPage />
					<FooterMediaPlayer />
				</Route>
				<Route path='/songs/:songId' exact={true}>
					<NavBar />
					<SongPage />
					<FooterMediaPlayer />
				</Route>
				<Route path='/contact-us' exact={true}>
					<NavBar />
					<ContactPage />
					<FooterMediaPlayer />
				</Route>
				<Route>
					<NavBar />
					<PageNotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
