const regEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

const required = (value) => !value && 'Обязательное поле';

const maxLength = (max) => (value) => value.length > max && `Максимальная длина — ${max} символов`;

const minLength = (min) => (value) => value.length < min && `Минимальная длина — ${min} символов`;

const emailValid = (value) => value.match(/@/) && !regEmail.test(value) && 'E-mail введен некорректно';

const isEmail = (value) => !value.match(/@/) && 'E-mail введен некорректно';

const thereIsNumber = (value) => !value.match(/[0-9]/) && 'Должно быть не менее одной цифры';

const thereIsLowerSymbol = (value) => !value.match(/[a-z]/) && 'Должно быть не менее одной строчной буквы';

const thereIsUpperSymbol = (value) => !value.match(/[A-Z]/) && 'Должно быть не менее одной прописной буквы';

const thereIsSpaceSymbol = (value) => value.match(/\s/) && 'Не должно содержать пробельные символы';

const email = (value) => {
	let errors = {};

	errors.required = required(value);
	if (!errors.required) {
		errors = {
			...errors,
			thereIsSpaceSymbol: thereIsSpaceSymbol(value),
			maxLength: maxLength(30)(value),
			minLength: minLength(4)(value),
			email: emailValid(value),
			isEmail: isEmail(value)
		}
	}

	const errorMessage = errors.required || errors.minLength || errors.maxLength || errors.thereIsSpaceSymbol || errors.isEmail || errors.email;

	return errorMessage;
};

const login = (value) => {
	let errors = {};

	errors.required = required(value);
	if (!errors.required) {
		errors = {
			...errors,
			thereIsSpaceSymbol: thereIsSpaceSymbol(value),
			maxLength: maxLength(30)(value),
			minLength: minLength(4)(value),
		}
	}

	const errorMessage = errors.required || errors.minLength || errors.maxLength || errors.thereIsSpaceSymbol;

	return errorMessage;
};


const loginOrEmail = (value) => {
	let errors = {};

	errors.required = required(value);
	if (!errors.required) {
		errors = {
			...errors,
			thereIsSpaceSymbol: thereIsSpaceSymbol(value),
			maxLength: maxLength(30)(value),
			minLength: minLength(4)(value),
			email: emailValid(value)
		}
	}

	const errorMessage = errors.required || errors.minLength || errors.maxLength || errors.thereIsSpaceSymbol || errors.email;

	return errorMessage;
};

const password = (value) => {
	let errors = {};

	errors.required = required(value);
	if (!errors.required) {
		errors = {
			...errors,
			maxLength: maxLength(30)(value),
			minLength: minLength(8)(value),
			thereIsNumber: thereIsNumber(value),
			thereIsLowerSymbol: thereIsLowerSymbol(value),
			thereIsUpperSymbol: thereIsUpperSymbol(value),
			thereIsSpaceSymbol: thereIsSpaceSymbol(value)
		}
	}

	const errorMessage = errors.required || errors.minLength || errors.maxLength || errors.thereIsSpaceSymbol || errors.thereIsNumber || errors.thereIsLowerSymbol || errors.thereIsUpperSymbol;

	return errorMessage;
};

export {
	loginOrEmail,
	password,
	login,
	email
};