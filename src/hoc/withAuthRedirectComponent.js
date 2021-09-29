import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getIsAuthenticate } from './../redux/selectors';

const mapStateToPropsForRedirect = (state) => {
	return {
		isAuthenticate: getIsAuthenticate(state),
	}
}

export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			if (this.props.isAuthenticate) return <Redirect to="/"></Redirect>;

			return <Component {...this.props} />
		}
	}
	
	const ConnectAuthRedirectComponent = connect (mapStateToPropsForRedirect) (RedirectComponent);

	return ConnectAuthRedirectComponent;
}