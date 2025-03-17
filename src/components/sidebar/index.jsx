import './style.css';
import { NavLink, useLocation } from 'react-router-dom';
import React, { useLayoutEffect } from 'react';

const PATHS = {
	mainPage: 0,
	subPage: 1,
	ownerName: 2,
	id: 3,
};

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
	userName = '',
	findMenu = () => {},
	...props
}) => {
	const location = useLocation();

	useLayoutEffect(() => {
		const pathname = location.pathname;
		const pathArray = pathname
			.split('/')
			.filter((path) => path !== '' && path !== 'admin-panel');
		const parameters = {
			userId,
			userType,
			ownerName: userName,
			isAdminPanel: pathname.includes('admin-panel'),
		};
		const numberLevels = pathArray.length;

		switch(numberLevels) {
			case 1: {
				parameters.mainPage = pathArray[PATHS.mainPage];

				break;
			}
			case 2: {
				parameters.subPage = pathArray[PATHS.subPage];
				parameters.mainPage = pathArray[PATHS.mainPage];

				break;
			}
			case 3: {
				parameters.subPage = pathArray[PATHS.subPage];
				parameters.mainPage = pathArray[PATHS.mainPage];
				parameters.ownerName = pathArray[PATHS.ownerName];

				break;
			}
			case 4: {
				parameters.id = pathArray[PATHS.id];
				parameters.subPage = pathArray[PATHS.subPage];
				parameters.mainPage = pathArray[PATHS.mainPage];
				parameters.ownerName = pathArray[PATHS.ownerName];

				break;
			}
			default: {
				break;
			}
		}

		findMenu(parameters);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname, userId]);

	return menu.length
		? <SidebarBlock menu={menu} userName={userName} {...props}/>
		: <></>;
});

const SidebarBlock = ({
	menu,
	userName,
	backToMain,
}) => {
	const isBack = (event) => {
		if (event.currentTarget.classList.contains('js-sidebar-music')) {
			backToMain(true);
		}
	};

	const blockPageLink =
		menu.map(pageLink => {
			const link = pageLink.link === 'music' && userName ? `${pageLink.link}/${userName}` : pageLink.link;
			let subMenuBlock = '';

			if (pageLink.subMenu?.length) {
				subMenuBlock = <SubMenuBlock subMenu={pageLink.subMenu} backToMain={backToMain} />;
			}

			return <>
				<NavLink className={`glitch-btn js-sidebar-${pageLink.link}`} to={`/${link}`} key={pageLink.link} onClick={ isBack }>
					<div className="title">{pageLink.name}</div>
					<div className="mask">
						<span>{pageLink.name}</span>
					</div>
				</NavLink>
				{ subMenuBlock }
			</>;
		})
	;

	return (
		<nav className="sidebar">
			{blockPageLink}
		</nav>
	);
}

const SubMenuBlock = ({
	subMenu,
	backToMain,
}) => {
	const isBack = (event) => {
		if (event.currentTarget.classList.contains('js-sidebar-music')) {
			backToMain(true);
		}
	};

	const blockSubMenu = subMenu?.map(subPageLink => {
		return (
			<div className={`sub-menu__glitch-btn ${ subPageLink.isSelected ? 'sub-menu__glitch-btn--selected' : '' }`} key={subPageLink.link}>
				<NavLink className={`sub-menu__link js-sidebar-${subPageLink.link}`} to={subPageLink.link} onClick={ isBack }>
					<span className="sub-menu__title">{subPageLink.name}</span>
				</NavLink>
			</div>
		);
	});

	return (
		<div className="sub-menu">
			{blockSubMenu}
		</div>
	);
}

export default Sidebar; 
