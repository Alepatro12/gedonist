import './style.css';
import { NavLink } from "react-router-dom";

const Menu = (props) => {

	let blockPageLink =
		props.menu.map(pageLink => {
			return (
				<NavLink className="glitch-btn" to={pageLink.link} key={pageLink.link}>
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