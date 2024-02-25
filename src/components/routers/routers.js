import React from 'react';

const Home = React.lazy(() => import('../home/index'));
const Menu = React.lazy(() => import('../menu/container'));
const About = React.lazy(() => import('../about/index'));
const Music = React.lazy(() => import('../music/container'));
const MusicNewCollection = React.lazy(() => import('../music/new-collection/container'));
const MusicChangeCollection = React.lazy(() => import('../music/change-collection/container'));
const LoginContainer = React.lazy(() => import('../auth/login/container'));
const NewPasswordContainer = React.lazy(() => import('../auth/new-password/container'));
const AuthenticateContainer = React.lazy(() => import('../auth/authenticate/container'));
const ChangePasswordContainer = React.lazy(() => import('../auth/change-password/container'));
const Fortune = React.lazy(() => import('../../fortune/index'));
const GMA2023 = React.lazy(() => import('../gma/container'));

export const commonRouters = [
    {element: Home, path: '/*', exact: true},
    {element: Menu, path: '/menu', exact: true},
    {element: About, path: '/about', exact: true},
    {element: Music, path: '/music/*', exact: true},
    {element: GMA2023, path: '/gma/*', exact: true},
];

export const unauthorizedUserRouters = [
    {element: LoginContainer, path: '/auth/login/*', exact: true},
    {element: NewPasswordContainer, path: '/auth/new-password/*', exact: true},
    {element: AuthenticateContainer, path: '/auth/authenticate/*', exact: true},
    {element: ChangePasswordContainer, path: '/auth/change-password/*', exact: true},
];

export const authorizedUserRouters = [
    {element: MusicNewCollection, path: '/music/new-collection', exact: true},
    {element: MusicChangeCollection, path: '/music/change-collection', exact: true},
    {element: Fortune, path: '/fortune', exact: true},
];