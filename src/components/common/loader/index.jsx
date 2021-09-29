import './style.css';
import loader from './../../../img/loader.svg';

const Loader = (props) => {
	return <>
		{props.isFetching && <img src={loader} alt="" className="center" />}
	</>
}

export default Loader;