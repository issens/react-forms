import { useState, useRef } from 'react';
import styles from './App.module.css';

const initialState = {
	email: '',
	password: '',
	checkPassword: '',
};

const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState } = useStore();
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	const onSumbit = (event) => {
		event.preventDefault();
		sendData(getState());
	};

	const { email, password, checkPassword } = getState();

	const onEmailChange = ({ target }) => {
		updateState('email', target.value);

		let error = null;
		if (!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/.test(target.value)) {
			error = 'email должен иметь вид: example@site.com';
		}
		setEmailError(error);
	};

	const onPasswordChange = ({ target }) => {
		updateState('password', target.value);

		let error = null;
		if (target.value === checkPassword) {
			submitButtonRef.current.focus();
			setPasswordError(null);
		} else if (target.value !== checkPassword && checkPassword !== '') {
			error = 'Пароли не совпадают';
			setPasswordError(error);
		}
	};

	const onCheckPasswordChange = ({ target }) => {
		updateState('checkPassword', target.value);

		let error = null;
		if (target.value === password) {
			submitButtonRef.current.focus();
			setPasswordError(null);
		} else if (target.value !== password && password !== '') {
			error = 'Пароли не совпадают';
			setPasswordError(error);
		}
	};

	return (
		<div className={styles.App}>
			<form onSubmit={onSumbit}>
				<input
					type="email"
					placeholder="example@example.com"
					value={email}
					onChange={onEmailChange}
				/>
				<input
					type="password"
					placeholder="Введите пароль"
					value={password}
					onChange={onPasswordChange}
				/>
				<input
					type="password"
					placeholder="Повторите пароль"
					value={checkPassword}
					onChange={onCheckPasswordChange}
				/>
				<button
					ref={submitButtonRef}
					type="submit"
					disabled={emailError && passwordError !== null}
				>
					Регистрация
				</button>
			</form>
			{emailError && <div>{emailError}</div>}
			{passwordError && <div>{passwordError}</div>}
		</div>
	);
};
