import { useForm } from 'react-hook-form';
import styles from './App.module.css';
import * as React from 'react';

export const App = () => {
	const {
		register,
		handleSubmit,
		watch,
		setFocus,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
			checkPassword: '',
		},
	});

	const emailProps = {
		pattern: {
			value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/,
			message:
				'E-mail должен иметь вид example@site.ru и не содержать символов кроме "_"',
		},
	};

	const passwordProps = {
		required: true,
	};

	const checkPasswordProps = {
		required: true,
		validate: (value) => {
			if (watch('password') !== value) {
				return 'Пароли не совпадают';
			}
		},
	};

	const emailError = errors.email?.message;
	const passwordError = errors.checkPassword?.message;

	const onSumbit = (formData) => {
		console.log(formData);
	};

	React.useEffect(() => {
		if (isValid) {
			setFocus('button');
		}
	});

	return (
		<div className={styles.App}>
			<form onSubmit={handleSubmit(onSumbit)}>
				<input
					{...register('email', emailProps)}
					type="email"
					placeholder="example@example.com"
				/>
				<input type="password" {...register('password', passwordProps)}></input>
				<input
					type="password"
					{...register('checkPassword', checkPasswordProps)}
				></input>
				<input
					value="Регистрация"
					className={styles.submit}
					type="button"
					{...register('button')}
					disabled={(passwordError || emailError) !== undefined}
				></input>
			</form>
			{emailError && <div>{emailError}</div>}
			{passwordError && <div>{passwordError}</div>}
		</div>
	);
};
