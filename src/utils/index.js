const REGULAR_LOGIN = /^([A-Za-z0-9_])+$/;
const REGULAR_PASSWORD = /^([A-Za-z0-9])+$/;
const REGULAR_FIRST_SYMBOL_LETTER = /^[A-Za-z]/;
const REGULAR_EMAIL = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

const required = (value) => !value && 'Обязательное поле';

const maxLength = (max) => (value) => value.length > max && `Максимальная длина — ${max} символов`;

const minLength = (min) => (value) => value.length < min && `Минимальная длина — ${min} символов`;

const emailValid = (value) => value.match(/@/) && !REGULAR_EMAIL.test(value) && 'E-mail введен некорректно';

const isEmail = (value) => !value.match(/@/) && 'E-mail введен некорректно';

const thereIsNumber = (value) => !value.match(/[0-9]/) && 'Должно быть не менее одной цифры';

const thereIsLowerSymbol = (value) => !value.match(/[a-z]/) && 'Должно быть не менее одной строчной буквы';

const thereIsUpperSymbol = (value) => !value.match(/[A-Z]/) && 'Должно быть не менее одной прописной буквы';

const thereIsSpaceSymbol = (value) => value.match(/\s/) && 'Не должно содержать пробельные символы';

const thereIsValidLoginSymbol = (value) => !REGULAR_LOGIN.test(value) && 'Может содержать только латинские буквы, цифры и знак нижнего подчёркивания';

const thereIsFirstSymbolLetter = (value) => !REGULAR_FIRST_SYMBOL_LETTER.test(value) && 'Первым символом может быть только буква';

const thereIsValidPasswordSymbol = (value) => !REGULAR_PASSWORD.test(value) && 'Может содержать только латинские буквы и цифры';

const email = (value) => {
	let errors = {};

	errors.required = required(value);
	if (!errors.required) {
		errors = {
			...errors,
			thereIsSpaceSymbol: thereIsSpaceSymbol(value),
			maxLength: maxLength(40)(value),
			minLength: minLength(4)(value),
			email: emailValid(value),
			isEmail: isEmail(value)
		}
	}

	return errors.required || errors.thereIsSpaceSymbol || errors.minLength || errors.maxLength || errors.isEmail || errors.email;
};

const login = (value) => {
	let errors = {};

	errors.required = required(value);
	if (!errors.required) {
		errors = {
			...errors,
			thereIsFirstSymbolLetter: thereIsFirstSymbolLetter(value),
			thereIsSpaceSymbol: thereIsSpaceSymbol(value),
			validSymbol: thereIsValidLoginSymbol(value),
			maxLength: maxLength(20)(value),
			minLength: minLength(4)(value),
		}
	}

	return errors.required || errors.thereIsFirstSymbolLetter || errors.thereIsSpaceSymbol || errors.validSymbol || errors.minLength || errors.maxLength;
};


const loginOrEmail = (value) => {
	let errors = {};

	errors.required = required(value);
	if (!errors.required) {
		errors = {
			...errors,
			thereIsSpaceSymbol: thereIsSpaceSymbol(value),
			maxLength: maxLength(40)(value),
			minLength: minLength(4)(value),
			email: emailValid(value)
		}
	}

	return errors.required || errors.thereIsSpaceSymbol || errors.minLength || errors.maxLength || errors.email;
};

const password = (value) => {
	let errors = {};

	errors.required = required(value);
	if (!errors.required) {
		errors = {
			...errors,
			maxLength: maxLength(40)(value),
			minLength: minLength(8)(value),
			thereIsNumber: thereIsNumber(value),
			thereIsLowerSymbol: thereIsLowerSymbol(value),
			thereIsUpperSymbol: thereIsUpperSymbol(value),
			thereIsSpaceSymbol: thereIsSpaceSymbol(value),
			validSymbol: thereIsValidPasswordSymbol(value),
		}
	}

	return errors.required || errors.thereIsLowerSymbol || errors.validSymbol || errors.minLength || errors.maxLength || errors.thereIsSpaceSymbol || errors.thereIsNumber || errors.thereIsUpperSymbol;
};

export {
	loginOrEmail,
	password,
	login,
	email
};