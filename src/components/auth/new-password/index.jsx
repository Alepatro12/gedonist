import './../style.css';
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { password } from './../../../utils/index';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const NewPassword = React.memo(({ errorText, isDisabled, getNewPassword }) => {
	const onSubmit = (formData, token, email) => {
		getNewPassword(formData.password, formData.passwordValid, token, email);
	}

	return (
		<div className="center">
			<div className="authentication">
				<div className="authentication__title">Восстановление пароля</div><br/>
				<div className="authentication__title authentication__title--subtext">Введите новый пароль</div> 
				<NewPasswordForm
					onSubmit={onSubmit}
					errorText={errorText}
					isDisabled={isDisabled}
				/>
			</div>
		</div>
	);
});

const validateForm = (formData) => {
	const errorPassword = password(formData.password);
	const isPasswordsMatch = formData.passwordValid !== formData.password ? 'Пароли не совпадают' : '';
	const errorPasswordText = password(formData.passwordValid);
	const errorPasswordValid = errorPasswordText || isPasswordsMatch;
	let errors = {};

	if (errorPassword || errorPasswordValid) {
		errors = {
			password: errorPassword,
			passwordValid: errorPasswordValid
		};
	}

	return errors;
};

const NewPasswordForm = React.memo(({ onSubmit, errorText, isDisabled }) => {
	let [params, ] = useState(new URLSearchParams(useLocation().search));

	return (
		<Formik
			initialValues = {{ password: '', passwordValid: '' }}
			validate = {(formData) => validateForm(formData)}
			onSubmit = {(formData) => onSubmit(formData, params.get('token-password'), params.get('email'))}
		>
			{() => (
				<Form>
					<Field type="password" className="authentication__input" name="password" placeholder="Пароль"/>
					<ErrorMessage name="password" component="div" className="authentication__error"/><br/>
					<Field type="password" className="authentication__input" name="passwordValid" placeholder="Подтверждение пароля"/>
					<ErrorMessage name="passwordValid" component="div" className="authentication__error"/><br/>
					<button type="submit" className="authentication__button authentication__button--primary" id="new-password" disabled={isDisabled}>Подтвердить</button>
					{ errorText && 
						<div className="authentication__error">{errorText}</div>
					}
				</Form>
			)}
		</Formik>
	);
});

export default NewPassword;