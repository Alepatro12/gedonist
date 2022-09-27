import './App.css';
import './style.css';
import React, { Suspense } from 'react';
import { Route, withRouter, BrowserRouter, Switch, Redirect } from "react-router-dom";
import HeaderContainer from './components/header/container';
import Sidebar from './components/sidebar/index';
import Footer from './components/footer/index';
import { connect } from 'react-redux';
import { initializedApp } from './redux/app-reducer';
import Home from './components/home/index';
import Loader from './components/common/loader';
import { compose } from 'redux';
import { getInitialized } from './redux/selectors';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import EmailWarningContainer from './components/email-warning/container';

const About = React.lazy(() => import('./components/about/index'));
const LoginContainer = React.lazy(() => import('./components/auth/login/container'));
const NewPasswordContainer = React.lazy(() => import('./components/auth/new-password/container'));
const AuthenticateContainer = React.lazy(() => import('./components/auth/authenticate/container'));
const ChangePasswordContainer = React.lazy(() => import('./components/auth/change-password/container'));

class App extends React.Component {
	componentDidMount() {
		this.props.initializedApp(this.props.location.search);
	}

	render() {
		if (this.props.initialized) {
			return (
				<div className="App">
					<EmailWarningContainer/>
					<div className={`background background--${this.props.match.params.pageName}`}>
						<HeaderContainer/>
						<Sidebar sidebar={this.props.state.sidebar} />
						<div className="main">
							<Route path="/" component={Home} />
							<Suspense fallback={<Loader isFetching={true}/>}>
								<Switch>
									<Route path={this.props.match.path + "/about"} component={About}/>
									<Route path={this.props.match.path + "/auth/login"} component={LoginContainer}/>
									<Route path={this.props.match.path + "/auth/new-password"} component={NewPasswordContainer}/>
									<Route path={this.props.match.path + "/auth/authenticate"} component={AuthenticateContainer}/>
									<Route path={this.props.match.path + "/auth/change-password"} component={ChangePasswordContainer}/>
									<Redirect from="/auth" to="/auth/login"/>
								</Switch>
							</Suspense>
						</div>
						<Footer/>
					</div>
				</div>
			);
		} else {
			return <Loader isFetching={!this.props.initialized} />;
		}

	}
}

const mapStateToProps = (state) => {
	return {
		initialized: getInitialized(state)
	}
};

const AppContainer = compose(
	withRouter,
	connect(mapStateToProps, { initializedApp })
) (App);

const MainApp = (props) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Route path="/:pageName?" render={props => (
					<AppContainer
						{...props}
						state={store.getState()}
					/>
				)}/>
			</BrowserRouter>
		</Provider>
	)
}

export default MainApp;