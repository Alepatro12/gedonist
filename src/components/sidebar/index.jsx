import './style.css';
import { NavLink } from "react-router-dom";

const Sidebar = ({
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