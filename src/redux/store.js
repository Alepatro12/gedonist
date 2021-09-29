import accountDataReducer from './account-data-reducer';
import validDataReducer from './valid-data-reducer';

let store = {
	_state: {
		pageLinks: [
			{name: 'Кино', link: '/movie'},
			{name: 'Обратная связь', link: '/feedback'},
			{name: 'О нас', link: '/about'}
		],
		accountData: {
			name: '',
			password: ''
		},
		validData: {
			name: '',
			password: ''
		}
	},

	_reRenderApp() {},

	getState() {
		return this._state;
	},
 
	subscribe(observer) {
		this._reRenderApp = observer;
	},

	dispatch(action) {
		this._state.accountData = accountDataReducer(this._state.accountData, action);
		this._state.validData = validDataReducer(this._state.validData, action);
		this._reRenderApp();
	}
}

export default store;