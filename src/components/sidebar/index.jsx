import './style.css';
import { NavLink } from "react-router-dom";

const Sidebar = ({
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