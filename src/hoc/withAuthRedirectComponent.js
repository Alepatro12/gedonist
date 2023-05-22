import React from 'react';
import { connect } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getIsAuthenticate, getIsChangePassword } from './../redux/selectors';
import { getIsCreatedCollection } from './../redux/music-selectors';

const mapStateToPropsForRedirect = (state) => {
	return {
		isAuthenticate: getIsAuthenticate(state),
		isChangePassword: getIsChangePassword(state),
		isCreatedCollection: getIsCreatedCollection(state)
	}
}

export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render() {
			switch(this.props.page) {
				case 'music-page': {
					if (this.props.isCreatedCollection) {
						return <Routes>
							<Route path="/music/*" element={
								<Navigate to={`/music/${this.props.userRealName}`} replace/>
							}/>
						</Routes>;
					}
					break;
				}
				case 'music': {
					if (!this.props.isAuthenticate || this.props.isCreatedCollection) {
						return <Routes>
							<Route path="/music/*" element={
								<Navigate to={`/music/${this.props.userName}`} replace/>
							}/>
						</Routes>;
					}
					break;
				}
				default: {
					if (this.props.isAuthenticate || this.props.isChangePassword) {
						return <Routes>
							<Route path="/auth/*" element={
								<Navigate to="/" replace/>
							}/>
						</Routes>;
					}
					break;
				}
			}

			return <Component {...this.props} />
		}
	}
	
	const ConnectAuthRedirectComponent = connect (mapStateToPropsForRedirect) (RedirectComponent);

	return ConnectAuthRedirectComponent;
}