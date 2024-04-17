import './style.css';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Header = React.memo(({ isAuthenticate, isDisabled, userName, getLogout, attemptIsChangePassword }) => {
	return (
		<header className="head">
			<div className="head__main">
				<div>
					<MenuButton/>
				</div>
				<div className="head__logo">
					<NavLink to="/" title="Перейти на Главную" translate="no">Gedonist</NavLink>
				</div>
			</div>
			<div className="head__registration">
				{isAuthenticate ?
					<Logout
						isDisabled={isDisabled}
						getLogout={getLogout}
						userName={userName}
					/>
				:
					<Login attemptIsChangePassword={attemptIsChangePassword} />
				}
			</div>
		</header>
	)
});

export const Logout = React.memo(({ userName, isDisabled, getLogout }) => {
	let [editMode, setEditMode] = useState(false);
	const ref = useRef(null);

	const handleClickOutside = (event) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setEditMode(false);
		}
	};

	const showUnlogin = () => setEditMode(true);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	})

	const attemptLogout = () => getLogout(userName);

	return <>
		<div className="head__login">
			<span onClick={ showUnlogin }>{userName}</span>
		</div>
		{editMode &&
			<div ref={ref} onClick={ attemptLogout } className="head__unlogin" disabled={isDisabled}>Выйти</div>
		}
	</>
});

const Login = React.memo(({ attemptIsChangePassword }) => {
	const deleteIsChangePassword = () => attemptIsChangePassword(false);

	return <>
		<div className="head__login">
			<NavLink to="/auth/login" onClick={ deleteIsChangePassword }>Войти</NavLink>
		</div>
	</>
});

const MenuButton = React.memo(() => {
	const pathname = useLocation().pathname;
	const navigate = useNavigate();
	const menuUrl = pathname.includes('/admin-panel') ? '/admin-panel/menu' : '/menu';

	const initMenu = () => {
		return ['/menu', '/admin-panel/menu'].includes(pathname);
	};

	let [isOpenMenu, setOpenMenu] = useState(initMenu());

	const toggleMenu = () => {
		if (isOpenMenu) {
			navigate(-1);
		}

		setOpenMenu(!isOpenMenu);
	};

	const handleClickOutside = (event) => {
		if (
			(event.target.nodeName === 'A'
			|| event.target.dataset.link)
			&& !event.target.classList.contains('js-menu')
		) {
			setOpenMenu(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	})

	return <>
		<NavLink to={ menuUrl } title="Открыть меню" className="head__menu js-menu" onClick={ toggleMenu }>
			<span className={`head__menu-icon ${ isOpenMenu ? 'head__menu-icon--active' : '' }`}></span>
		</NavLink>
	</>
});

export default Header;
