import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getIsAuthenticate, getUserType } from './../../redux/selectors';
import { connect } from 'react-redux';
import {
	commonRouters,
	moderatorRouters,
	authorizedUserRouters,
	unauthorizedUserRouters,
} from './routers';
import {
	USER_TYPE_DEFAULT,
	USER_TYPE_MODERATOR,
	USER_TYPE_ADMINISTRATOR,
} from '../../utils/constants';

const AppRouter = React.memo(({ isAuthenticate = false, userType = 0 }) => {
	let addRouters = [];

	switch(userType) {
		case USER_TYPE_MODERATOR:
		case USER_TYPE_ADMINISTRATOR:
			addRouters = authorizedUserRouters.concat(moderatorRouters);
			break;
		case USER_TYPE_DEFAULT:
			addRouters = authorizedUserRouters;
			break;
		default:
			addRouters = unauthorizedUserRouters;
			break;
	}

	const routers = commonRouters.concat(addRouters);
	const authRedirect = isAuthenticate ?
		<Route path="/auth/*" element={
			<Navigate to="/" replace/>
		}/>
	: <></>;

	const blockRouters =
		routers.map(route => {
			return <Route
				key={route.path}
				element={<route.element/>}
				path={route.path}
				exact={route.exact}
			/>;
		})
	;

	return <Routes>
			{ authRedirect }
			{ blockRouters }
			<Route path="/auth" element={
				<Navigate to="/auth/login" replace/>
			}/>
	</Routes>;
});

const mapStateToProps = (state) => {
	return {
		userType: getUserType(state),
		isAuthenticate: getIsAuthenticate(state),
	}
};

const AppRouterContainer = connect(mapStateToProps)(AppRouter);

export default AppRouterContainer; 
