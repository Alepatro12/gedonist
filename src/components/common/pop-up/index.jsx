import './style.css';
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Get a list of search results
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {bool} isFocus Focus flag
 * @param {Array} results Results array
 * @param {Function} hideFocus The logic of losing focus
 * @param {Function} selectOption The logic of selecting option
 * @returns {HTMLElement}
 */
const PopUp = React.memo(({
	isLink = false,
	isFocus = false,
	results = [],
	hideFocus = () => {},
	selectOption = () => {},
}) => {
	const handleClickOutside = (event) => {
		if (
			event.target.nodeName !== 'INPUT'
			&& !event.target.classList.contains('js-sub-menu')
			&& !event.target.classList.contains('js-search-result')
		) {
			hideFocus(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	const choiceOption = (event) => {
		const selectedOption = event.currentTarget;

		if (!selectedOption) {
			return;
		}

		selectOption(selectedOption.dataset);
	};

	const blockPopUp =
		results.map(result => {
			if (isLink) {
				return <div key={result.id} className="popup__block popup__block--menu">
					<NavLink
						to={result.link}
						className="popup__link"
						onClick={ choiceOption }
					>
						<div className="popup__name">{result.name}</div>
					</NavLink>
				</div>;
			} else {
				let dataAttributes = {};

				for (const key in result) {
					dataAttributes[`data-${key}`] = result[key];
				}

				return <div
					className="popup__block"
					key={result.id}
					onClick={ choiceOption }
					{...dataAttributes}
				>{result.record}</div>;
			}
		});
	;

	return <>
		<div
			className={`popup js-search-result ${ isLink ? 'popup--menu' : '' }`}
			hidden={!isFocus || !results.length}
		>
			{blockPopUp}
		</div>
	</>;
});

export default PopUp;
