import { forwardRef } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';
import { IInputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, IInputProps>(function Input({ isValid = true, className, ...props }, ref) {
	return (
		<input ref={ref} className={classNames(styles['input'], className, {
			[styles['invalid']]: isValid
		})} {...props}/>
	);
});

export default Input;