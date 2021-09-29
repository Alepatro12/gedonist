import React from 'react';

const inputLoginOrEmail = (
	{
		input,
		meta: {
			touched,
			error: {
				email,
				required,
				minLength,
				maxLength,
				thereIsSpaceSymbol
			} = {}
		},
		...props
	}
) => {
	const error = touched && (required || minLength || maxLength || thereIsSpaceSymbol || email);
	return <>
		<input {...input} {...props} type="text" className="modal__input"/>
		{ error && <div className="modal__error">{error}</div>}
	</>
};

const inputLogin = (
	{
		input,
		meta: {
			touched,
			error: {
				required,
				minLength,
				maxLength,
				thereIsSpaceSymbol
			} = {}
		},
		...props
	}
) => {
	const error = touched && (required || minLength || maxLength || thereIsSpaceSymbol);
	return <>
		<input {...input} {...props} type="text" className="modal__input"/>
		{ error && <div className="modal__error">{error}</div>}
	</>
};

const inputEmail = (
	{
		input,
		meta: {
			touched,
			error: {
				email,
				isEmail,
				required,
				minLength,
				maxLength,
				thereIsSpaceSymbol
			} = {}
		},
		...props
	}
) => {
	const error = touched && (required || minLength || maxLength || thereIsSpaceSymbol || isEmail || email);
	return <>
		<input {...input} {...props} type="text" className="modal__input"/>
		{ error && <div className="modal__error">{error}</div>}
	</>
};

const inputPassword = (
	{
		input,
		meta: {
			touched,
			error: {
				required,
				minLength,
				maxLength,
				thereIsNumber,
				thereIsSpaceSymbol,
				thereIsLowerSymbol,
				thereIsUpperSymbol
			} = {}
		},
		...props
	}
) => {
	const error = touched && (required || minLength || maxLength || thereIsSpaceSymbol || thereIsNumber || thereIsLowerSymbol || thereIsUpperSymbol);
	return <>
		<input {...input} {...props} type="password" className="modal__input"/>
		{ error && <div className="modal__error">{error}</div>}
	</>
};

export {
	inputLoginOrEmail,
	inputPassword,
	inputLogin,
	inputEmail
};