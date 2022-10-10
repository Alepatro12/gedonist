import './style.css';
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {

	const blockPageLink =
		props.menu.map(pageLink => {
			return (
				<NavLink className="glitch-btn" to={pageLink.link} key={pageLink.link}>
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