const INPUT_NAME = 'INPUT_NAME';
const INPUT_PASSWORD = 'INPUT_PASSWORD';

let initialState = {
	name: '',
	password: ''
};

const validDataReducer = (state = initialState, action) => {
	switch (action.type) {
		case INPUT_NAME:
			return {
				...state,
				name: action.name
			};
		case INPUT_PASSWORD:
			return {
				...state,
				password: action.password
			};
		default:
			return state;
	}
}

export const inputName = (name) => {
	return {
		type: INPUT_NAME,
		name
	}
}

export const inputPassword = (password) => {
	return {
		type: INPUT_PASSWORD,
		password
	}
}

export default validDataReducer;