import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import NavBar from './components/NavBar';
import UsersList from './components/UsersList';
import User from './components/User';
import AlbumForm from './components/AlbumForm';
import SongForm from './components/SongForm';
import HomePage from './components/HomePage'
import AlbumPage from './components/AlbumPage'
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
				</Route>
				<Route path='/users/:userId' exact={true} >
					<NavBar />
					<User />
				</Route>
				<ProtectedRoute path='/add-album' exact={true}>
					<NavBar />
					<AlbumForm />
				</ProtectedRoute>
				<ProtectedRoute path='/add-song' exact={true}>
					<NavBar />
					<SongForm />
				</ProtectedRoute>
				<Route path='/albums/:albumId' exact={true}>
					<NavBar />
					<AlbumPage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
