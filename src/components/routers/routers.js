import React from 'react';

const Home = React.lazy(() => import('../home/index'));
const About = React.lazy(() => import('../about/index'));
const Menu = React.lazy(() => import('../menu/container'));
const Music = React.lazy(() => import('../music/container'));
const GMA = React.lazy(() => import('../gma/container'));
const Fortune = React.lazy(() => import('../../fortune/index'));
const AdminPanel = React.lazy(() => import('../admin-panel/index'));
const Repetition = React.lazy(() => import('../repetition/container'));
const LoginContainer = React.lazy(() => import('../auth/login/container'));
const AdminRepetition = React.lazy(() => import('../admin-repetition/container'));
const NewPasswordContainer = React.lazy(() => import('../auth/new-password/container'));
const AuthenticateContainer = React.lazy(() => import('../auth/authenticate/container'));
const MusicNewCollection = React.lazy(() => import('../music/new-collection/container'));
const RepetitionDiscipline = React.lazy(() => import('../repetition/discipline/container'));
const ChangePasswordContainer = React.lazy(() => import('../auth/change-password/container'));
const MusicChangeCollection = React.lazy(() => import('../music/change-collection/container'));
const AdminRepetitionDiscipline = React.lazy(() => import('../admin-repetition/discipline/container'));

export const commonRouters = [
	{element: Home, path: '/*', exact: true},
	{element: Menu, path: '/menu', exact: true},
	{element: About, path: '/about', exact: true},
	{element: Music, path: '/music/*', exact: true},
	{element: GMA, path: '/gma/*', exact: true},
];

export const unauthorizedUserRouters = [
	{element: LoginContainer, path: '/auth/login/*', exact: true},
	{element: NewPasswordContainer, path: '/auth/new-password/*', exact: true},
	{element: AuthenticateContainer, path: '/auth/authenticate/*', exact: true},
	{element: ChangePasswordContainer, path: '/auth/change-password/*', exact: true},
];

export const authorizedUserRouters = [
	{element: Fortune, path: '/fortune', exact: true},
	{element: Repetition, path: '/repetition', exact: true},
	{element: MusicNewCollection, path: '/music/new-collection', exact: true},
	{element: RepetitionDiscipline, path: '/repetition/javascript', exact: true},
	{element: MusicChangeCollection, path: '/music/change-collection', exact: true},
	{element: RepetitionDiscipline, path: '/repetition/english-grammar', exact: true},
];

/**
 * @const
 * @type {Array} Admin Panel Pages
 */
export const moderatorRouters = [
	{element: Menu, path: '/admin-panel/menu', exact: true},
	{element: AdminPanel, path: '/admin-panel', exact: true},
	{element: AdminRepetition, path: '/admin-panel/repetition', exact: true},
	{element: AdminRepetitionDiscipline, path: '/admin-panel/repetition/javascript', exact: true},
	{element: AdminRepetitionDiscipline, path: '/admin-panel/repetition/english-grammar', exact: true},
];
