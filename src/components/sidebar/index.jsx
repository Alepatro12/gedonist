import './style.css';
import { NavLink, useLocation } from 'react-router-dom';
import React, { useLayoutEffect } from 'react';

/**
 * Render the Sidebar
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} menu List of menu
 * @param {number} userId User ID
 * @param {number} userType User type
 * @param {Function} findMenu Search for menu
 * @returns {HTMLElement}
 */
const Sidebar = React.memo(({
	menu = [],
	userId = 0,
	userType = 0,
	findMenu = () => {},
	...props
}) => {
	const location = useLocation();

	useLayoutEffect(() => {
		const isAdminPanel = location.pathname.includes('/admin-panel');

		findMenu(userId, userType, isAdminPanel);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	return menu.length
		? <SidebarBlock menu={menu} {...props}/>
		: <></>;
});

const SidebarBlock = ({
	menu,
	userName,
	backToMain
}) => {
	const isBack = (event) => {
		if (event.currentTarget.classList.contains('js-sidebar-music')) {
			backToMain(true);
		}
	};

	const blockPageLink =
		menu.map(pageLink => {
			const link = pageLink.link === 'music' && userName ? `${pageLink.link}/${userName}` : pageLink.link;

			return (
				<NavLink className={`glitch-btn js-sidebar-${pageLink.link}`} to={`/${link}`} key={pageLink.link} onClick={ isBack }>
					<div className="title">{pageLink.name}</div>
					<div className="mask">
						<span>{pageLink.name}</span>
					</div>
				</NavLink>
			);
		})
	;

	return (
		<nav className="sidebar">
			{blockPageLink}
		</nav>
	);
}

export default Sidebar; 
