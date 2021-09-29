import './style.css';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Header = React.memo(({ isAuthenticate, isDisabled, name, getLogout }) => {
	return (
		<header className="head">
			<div className="head__logo">
				<NavLink to="/" title="Перейти на Главную">Gedonist</NavLink>
			</div>
			<div className="head__registration">
				{isAuthenticate ?
					<Logout
						isDisabled={isDisabled}
						getLogout={getLogout}
						name={name}
					/>
				:
					<NavLink to="/auth/login">Войти</NavLink>
				}
			</div>
		</header>
	)
});

export const Logout = React.memo(({ name, isDisabled, getLogout }) => {
	let [editMode, setEditMode] = useState(false);

	const showUnlogin = () => {
		setEditMode(true);
	}

	const attemptLogout = () => {
		getLogout(name);
	}

	return <>
		<span onClick={ showUnlogin }>{name}</span>
		{editMode &&
			<div onClick={ attemptLogout } className="modal__error modal__error--unlogin" disabled={isDisabled}>Выйти</div>
		}
	</>
});

export default Header;