import './../style.css';
import React from 'react';
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginOrEmail, password } from './../../../utils/index';

const Login = React.memo(({ getLogin, errorText, isDisabled }) => {
	const onSubmit = (formData) => {
		getLogin(formData.password, formData.name, formData.remember);
	}

	return (
		<div className="modal">
			<div className="modal__title">Вход в аккаунт</div><br/>
			<LoginForm
				onSubmit={onSubmit}
				errorText={errorText}
				isDisabled={isDisabled}
			/>
		</div> 
	);
});

const validateForm = (formData) => {
	const errorName = loginOrEmail(formData.name);
	const errorPassword = password(formData.password);
	let errors = {};

	if (errorName || errorPassword) {
		errors = {
			name: errorName,
			password: errorPassword
		}
	}

	return errors;
};

const LoginForm = React.memo(({ onSubmit, errorText, isDisabled}) => {
	return (
		<Formik
			initialValues = {{ name: '', password: '', remember: true }}
			validate = {(formData) => validateForm(formData)}
			onSubmit = {(formData) => onSubmit(formData)}
		>
			{() => (
				<Form>
					<Field type="text" className="modal__input" name="name" placeholder="Имя или e-mail"/>
					<ErrorMessage name="name" component="div" className="modal__error"/><br/>
					<Field type="password" className="modal__input" name="password" placeholder="Пароль"/>
					<ErrorMessage name="password" component="div" className="modal__error"/><br/>
					<div className="modal__input modal__input--remember">
						<label className="modal__label">
							<Field type="checkbox" name="remember" className="modal__checkbox"/>
							<span className="modal__text-label">Запомнить меня</span>
						</label>
						<label className="modal__label">
							<span className="modal__text-label modal__text-label--right">Забыли пароль?</span>
						</label>
					</div>
					<button type="submit" className="modal__button modal__button--primary" id="login" disabled={isDisabled}>Вход</button>
					{ errorText && 
						<div className="modal__error">{errorText}</div>
					}
					<br/>
					<div className="modal__button modal__button--default">
						<NavLink to="/auth/authenticate" className="modal__link">Регистрация</NavLink>
					</div>
				</Form>
			)}
		</Formik>
	)
});

export default Login;