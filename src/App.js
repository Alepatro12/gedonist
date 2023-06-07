import './style.css';
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, useLocation } from "react-router-dom";
import HeaderContainer from './components/header/container';
import Footer from './components/footer/index';
import { connect } from 'react-redux';
import { initializedApp } from './redux/app-reducer';
import Loader from './components/common/loader';
import { getInitialized } from './redux/selectors';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import EmailWarningContainer from './components/email-warning/container';
import Sidebar from './components/sidebar/container';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import AppRouterContainer from './components/routers';

const App = ({initialized, initializedApp}) => {
	const location = useLocation();
	const backgroundName = location.pathname
		.slice(1)
		.split('/')[0];

	useEffect(() => {
		initializedApp(location.search);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialized]);

	return initialized ?
		<div className="App">
			<EmailWarningContainer/>
			<LazyLoadComponent>
				<div className={`background background--${backgroundName}`}>
					<HeaderContainer/>
					<Sidebar/>
					<div className="main">
						<Suspense fallback={
							<Loader isFetching={true}/>
						}>
							<AppRouterContainer/>
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
				<AppContainer
					{...props}
					state={store.getState()}
				/>
			</BrowserRouter>
		</Provider>
	)
}

export default MainApp;