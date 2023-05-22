import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { getIsAuthenticate } from './../../redux/selectors';
import { connect } from 'react-redux';
import {
	commonRouters,
	authorizedUserRouters,
	unauthorizedUserRouters
} from './routers';

const AppRouter = React.memo(({ isAuthenticate }) => {
	const addRouters = isAuthenticate ? authorizedUserRouters : unauthorizedUserRouters;
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
		isAuthenticate: getIsAuthenticate(state),
	}
};

const AppRouterContainer = connect(mapStateToProps)(AppRouter);

export default AppRouterContainer; 