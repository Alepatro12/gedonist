import './style.css';
import { Provider, connect } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import store from './redux/redux-store';
import AppRouter from './components/routers';
import Footer from './components/footer/index';
import Loader from './components/common/loader';
import Header from './components/header/container';
import { getInitialized } from './redux/selectors';
import { initializedApp } from './redux/app-reducer';
import Sidebar from './components/sidebar/container';
import EmailWarning from './components/email-warning/container';
import DropDownMenu from './components/drop-down-menu/container';
import PopUpNotification from './components/pop-up-notification/container';

const App = ({initialized, initializedApp}) => {
	const location = useLocation();
	const backgroundName = location.pathname
		.slice(1)
		.split('/')[0];

	useEffect(() => {
		if (!initialized) {
			initializedApp(location.search);
		}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialized]);

	return initialized ?
		<div className="App">
			<EmailWarning/>
			<LazyLoadComponent>
				<div className={`background background--${backgroundName}`}>
					<Header/>
					<Sidebar/>
					<div className="main">
						<Suspense fallback={
							<Loader isFetching={true}/>
						}>
							<DropDownMenu/>
							<AppRouter/>
							<PopUpNotification/>
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