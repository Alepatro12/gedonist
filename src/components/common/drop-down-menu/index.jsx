import './style.css';
import React from 'react';
import PopUp from './../../common/pop-up';
import { isMobile } from '../../../utils/utils';

/**
 * Get a block of information about a discipline repetition
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {String} name Name of discipline
 * @param {number} counter Counter of correct answers
 * @param {bool} isChecking Response check flag
 * @param {Object} pageNumbers Page numbers
 * @param {Object} currentQuestion Current question data
 * @returns {HTMLElement}
 */
const DropDownMenu = React.memo(({ subMenu = [] }) => {
	const [isFocusMenu, setFocusMenu] = React.useState(false);

	if (!isMobile() || !subMenu?.length) {
		return <></>;
	}

	const onMenu = () => setFocusMenu(true);
	const hideFocus = () => setFocusMenu(false);

	const blockSubMenu = subMenu?.map(subPageLink => {
		if (!subPageLink.isSelected) {
			return <></>;
		}

		return (
			<div className="drop-down-menu" key={subPageLink.id}>
				<div className="drop-down-menu__block" onClick={ onMenu }>
					<div className="drop-down-menu__side js-sub-menu"></div>
					<div className="drop-down-menu__main js-sub-menu">
						<div className="drop-down-menu__title js-sub-menu">{subPageLink.name}</div>
					</div>
					<div className="drop-down-menu__side drop-down-menu__side--right js-sub-menu"></div>
					<div></div>
					<div className="drop-down-menu__popup">
						<PopUp
							hideFocus={ hideFocus }
							isFocus={ isFocusMenu }
							results={ subMenu.filter((subPageLink) => !subPageLink.isSelected) }
							selectOption={ () => {} }
							isLink = { true }
						/>
					</div>
					<div></div>
				</div>
			</div>
		);
	});

	return blockSubMenu;
});

export default DropDownMenu;
