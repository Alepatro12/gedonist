import checkAuthenticationReducer, { checkUser } from './account-data-reducer';

it('check authentication', () => {
	const action = checkUser('Lady');
	const state = {
		isAuthenticate: false,
		name: ''
	};

	const newState = checkAuthenticationReducer(state, action);

	expect(newState.name).toBe('Lady');
	expect(newState.isAuthenticate).toBe(true);
});