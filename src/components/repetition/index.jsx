import './style.css';
import { NavLink, useParams } from 'react-router-dom';
import React, { useLayoutEffect } from 'react';

/**
 * Render the Repetition page
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} menu List of disciplines
 * @param {number} userId
 * @param {Function} findMenu Search for disciplines
 * @returns {HTMLElement}
 */
const Repetition = React.memo(({
	menu = [],
	userId = 0,
	ownerName = '',
	findMenu = () => {},
}) => {
	const { ownerName: newOwnerName = '' } = useParams();
	const isChangeOwner = ownerName === newOwnerName;

	useLayoutEffect(() => {
		findMenu(userId, newOwnerName);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userId, isChangeOwner]);

	return menu.length
		? <RepetitionBlock menu={menu} ownerName={ownerName}/>
		: <></>;
});

/**
 * Get a block of information about a repetition menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} menu List of disciplines
 * @returns {HTMLElement}
 */
const RepetitionBlock = React.memo(({ menu = [], ownerName = '' }) => {
	let menuBlock = '';
	let pageNumber = 0;

	if (menu) {
		menuBlock = menu?.map(paragraph => {
			pageNumber += 2;

			return <DisciplineBlock key={paragraph.id} ownerName={ownerName} pageNumber={pageNumber} {...paragraph}/>
		})
	}

	return <>
		<div className="repetition">
			<div className="repetition__block">
				<div className="repetition__page">
					<div className="repetition__front-page">
						<div className="repetition__title">Повторение изученного материала</div>
					</div>
				</div>
				<div className="repetition__page">
					<div className="repetition__content">
						<div className="repetition__menu">Меню</div>
						<div className="repetition__menu-block">
							{ menuBlock }
						</div>
						<div className="repetition__menu-page-number">1</div>
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
const DisciplineBlock = React.memo(({
	id = 0,
	name = '',
	ownerName = '',
	pageNumber = 0,
}) => {
	return <>
		<div className="repetition__row">
			<div className="repetition__name">
				<NavLink to={`/repetition/subject/${ownerName}/${id}`}>{name}</NavLink>
			</div>
			<div className="repetition__number-page">{pageNumber}</div>
		</div>
	</>;
});

export default Repetition;
