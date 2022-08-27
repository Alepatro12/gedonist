import './style.css';
import React, { useEffect, useRef, useState } from 'react';
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

	const attemptLogout = () => getLogout(name);

	return <>
		<span onClick={ showUnlogin }>{name}</span>
		{editMode &&
			<div ref={ref} onClick={ attemptLogout } className="head__unlogin" disabled={isDisabled}>Выйти</div>
		}
	</>
});

export default Header;