import './style.css';
import { NavLink } from "react-router-dom";

const Menu = ({
	menu,
	backToMain
}) => {
	const isBack = (event) => {
		if (event.currentTarget.classList.contains('js-sidebar-music')) {
			backToMain(true);
		}
	};

	const blockPageLink =
		menu.map(pageLink => {
			return (
				<NavLink className={`glitch-btn js-sidebar-${pageLink.link}`} to={`/${pageLink.link}`} key={pageLink.link} onClick={ isBack }>
					<div className="title" data-link="true">{pageLink.name}</div>
					<div className="mask">
						<span>{pageLink.name}</span>
					</div>
				</NavLink>
			);
		})
	;

	return (
		<div className="menu">
			{blockPageLink}
		</div>
	);
}

export default Menu; 