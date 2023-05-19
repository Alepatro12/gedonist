import './App.css';
import './style.css';
import React, { Suspense, useEffect } from 'react';
import { Route, BrowserRouter, Routes, Navigate, useLocation } from "react-router-dom";
import HeaderContainer from './components/header/container';
import Footer from './components/footer/index';
import { connect } from 'react-redux';
import { initializedApp } from './redux/app-reducer';
import Home from './components/home/index';
import Loader from './components/common/loader';
import { getInitialized } from './redux/selectors';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import EmailWarningContainer from './components/email-warning/container';
import Sidebar from './components/sidebar/container';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

const Menu = React.lazy(() => import('./components/menu/container'));
const About = React.lazy(() => import('./components/about/index'));
const Music = React.lazy(() => import('./components/music/container'));
const MusicNewCollection = React.lazy(() => import('./components/music/new-collection/container'));
const MusicChangeCollection = React.lazy(() => import('./components/music/change-collection/container'));
const LoginContainer = React.lazy(() => import('./components/auth/login/container'));
const NewPasswordContainer = React.lazy(() => import('./components/auth/new-password/container'));
const AuthenticateContainer = React.lazy(() => import('./components/auth/authenticate/container'));
const ChangePasswordContainer = React.lazy(() => import('./components/auth/change-password/container'));
const Fortune = React.lazy(() => import('./fortune/index'));

const App = ({initialized, initializedApp}) => {
	const location = useLocation();

	useEffect(() => {
		initializedApp(location.search);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialized]);

	return initialized ?
		<div className="App">
			<EmailWarningContainer/>
			<LazyLoadComponent>
				<div className={`background background--${location.pathname.slice(1).split('/')[0]}`}>
					<HeaderContainer/>
					<Sidebar/>
					<div className="main">
						<Suspense fallback={<Loader isFetching={true}/>}>
							<Routes>
								<Route path="/" element={<Home/>}/>
								<Route path={"/menu"} element={<Menu/>}/>
								<Route path={"/about"} element={<About/>}/>
								<Route path={"/music/new-collection"} element={<MusicNewCollection/>}/>
								<Route path={"/music/change-collection"} element={<MusicChangeCollection/>}/>
								<Route path={"/music/*"} element={<Music/>}/>
								<Route path={"/auth/login/*"} element={<LoginContainer/>}/>
								<Route path={"/auth/new-password/*"} element={<NewPasswordContainer/>}/>
								<Route path={"/auth/authenticate/*"} element={<AuthenticateContainer/>}/>
								<Route path={"/auth/change-password/*"} element={<ChangePasswordContainer/>}/>
								<Route path={"/fortune"} element={<Fortune/>}/>
								<Route path="/auth" element={<Navigate to="/auth/login" replace/>}/><Route></Route>
							</Routes>
						</Suspense>
					</div>
					<Footer/>
			</div>
			</LazyLoadComponent>
		</div>
		: <Loader isFetching={!initialized}/>;
};

const mapStateToProps = (state) => {
	return {
		initialized: getInitialized(state)
	}
};

const AppContainer = connect(mapStateToProps, { initializedApp }) (App);

const MainApp = (props) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/*" element={
						<AppContainer
							{...props}
							state={store.getState()}
						/>
					}/>
				</Routes>
			</BrowserRouter>
		</Provider>
	)
}

export default MainApp;