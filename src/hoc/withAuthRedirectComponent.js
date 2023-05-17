import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
						return <Redirect to={`/music/${this.props.userRealName}`}></Redirect>;
					}
					break;
				}
				case 'music': {
					if (!this.props.isAuthenticate || this.props.isCreatedCollection) {
						return <Redirect to={`/music/${this.props.userName}`}></Redirect>;
					}
					break;
				}
				default: {
					if (this.props.isAuthenticate || this.props.isChangePassword) {
						return <Redirect to="/"></Redirect>;
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