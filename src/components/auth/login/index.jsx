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
		<div className="center">
			<div className="authentication">
				<div className="authentication__title">Вход в аккаунт</div><br/>
				<LoginForm
					onSubmit={onSubmit}
					errorText={errorText}
					isDisabled={isDisabled}
				/>
			</div> 
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
		};
	}

	return errors;
};

const LoginForm = React.memo(({ onSubmit, errorText, isDisabled }) => {
	return (
		<Formik
			initialValues = {{ name: '', password: '', remember: true }}
			validate = {(formData) => validateForm(formData)}
			onSubmit = {(formData) => onSubmit(formData)}
		>
			{() => (
				<Form>
					<Field type="text" className="authentication__input" name="name" placeholder="Логин или e-mail"/>
					<ErrorMessage name="name" component="div" className="authentication__error"/><br/>
					<Field type="password" className="authentication__input" name="password" placeholder="Пароль"/>
					<ErrorMessage name="password" component="div" className="authentication__error"/><br/>
					<div className="authentication__input authentication__input--remember">
						<label className="authentication__label">
							<Field type="checkbox" name="remember" className="authentication__checkbox"/>
							<span className="authentication__text-label">Запомнить меня</span>
						</label>
						<NavLink to="/auth/change-password" className="authentication__text-label authentication__text-label--color">Забыли пароль?</NavLink>
					</div>
					<button type="submit" className="authentication__button authentication__button--primary" id="login" disabled={isDisabled}>Вход</button>
					{ errorText && 
						<div className="authentication__error">{errorText}</div>
					}
					<br/>
					<div className="authentication__button authentication__button--default">
						<NavLink to="/auth/authenticate" className="authentication__link">Регистрация</NavLink>
					</div>
				</Form>
			)}
		</Formik>
	)
});

export default Login;