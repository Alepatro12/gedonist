import './style.css';
import { NavLink } from 'react-router-dom';
import React, { useLayoutEffect } from 'react';

/**
 * Render the admin repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} menu List of disciplines
 * @param {number} userId
 * @param {Function} findMenu Search for disciplines
 * @returns {HTMLElement}
 */
const AdminRepetition = React.memo(({
	menu = [],
	userId = 0,
	findMenu = () => {},
}) => {
	useLayoutEffect(() => {
		findMenu(userId);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId]);

	return menu.length
		? <AdminRepetitionBlock menu={menu}/>
		: <></>;
});

/**
 * Get a block of information about a admin repetition menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} menu List of disciplines
 * @returns {HTMLElement}
 */
const AdminRepetitionBlock = React.memo(({ menu = [] }) => {
	return <>
		<div className="admin-repetition">
			<div className="admin-repetition__block">
				<div className="admin-repetition__page">
					<div className="admin-repetition__front-page">
						<div className="admin-repetition__title">Повторение изученного материала</div>
					</div>
				</div>
				<div className="admin-repetition__page">
					<div className="admin-repetition__content">
						<div className="admin-repetition__menu">Меню</div>
						<div className="admin-repetition__menu-block">
							{ menu?.map(paragraph => <AdminDisciplineBlock key={paragraph.id} {...paragraph}/>) }
						</div>
						<div className="admin-repetition__menu-page-number">1</div>
					</div>
				</div>
			</div>
		</div>
	</>;
});

/**
 * Get a block of disciplines
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name Name of discipline
 * @param {String} link Title of the discipline page
 * @param {number} pageNumber Page number
 * @returns {HTMLElement}
 */
const AdminDisciplineBlock = React.memo(({
	name = '',
	link = '',
	pageNumber = 0,
}) => {
	return <>
		<div className="admin-repetition__row">
			<div className="admin-repetition__name">
				<NavLink to={`/admin-panel/repetition/${link}`}>{name}</NavLink>
			</div>
			<div className="admin-repetition__number-page">{pageNumber}</div>
		</div>
	</>;
});

export default AdminRepetition;
