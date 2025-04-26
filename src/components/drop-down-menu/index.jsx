import './style.css';

import React from 'react';

import PopUp from './../common/pop-up';
import { isMobile } from '../../utils/utils';

/**
 * Get a dropdown menu
 *
 * @author Alessandro Vilanni
 * @version 1.0.0
 *
 * @param {Array} subMenu Data the submenu
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
			return <React.Fragment key={subPageLink.id}></React.Fragment>;
		}

		const options = {
			classModifier: subPageLink.classModifier,
		};

		return <div className="drop-down-menu" key={subPageLink.id}>
			<div className="drop-down-menu__block" onClick={ onMenu }>
				<div className={`drop-down-menu__side js-sub-menu ${ subPageLink.classModifier ? `drop-down-menu__side--${subPageLink.classModifier}` : '' }`}></div>
				<div className={`drop-down-menu__main js-sub-menu ${ subPageLink.classModifier ? `drop-down-menu__main--${subPageLink.classModifier}` : '' }`}>
					<div className="drop-down-menu__title js-sub-menu">{subPageLink.name}</div>
				</div>
				<div className={`drop-down-menu__side drop-down-menu__side--right js-sub-menu ${ subPageLink.classModifier ? `drop-down-menu__side--${subPageLink.classModifier}` : '' }`}></div>
				<div></div>
				<div className="drop-down-menu__popup">
					<PopUp
						hideFocus = { hideFocus }
						isFocus = { isFocusMenu }
						results = { subMenu.filter((subPageLink) => !subPageLink.isSelected) }
						selectOption = { () => {} }
						isLink = { true }
						options = { options }
					/>
				</div>
				<div></div>
			</div>
		</div>;
	});

	return blockSubMenu;
});

export default DropDownMenu;
