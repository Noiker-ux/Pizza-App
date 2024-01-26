// styles
import styles from './Button.module.css';
// interfaces
import { IButtonProps } from './Button.props';
// libs
import classNames from 'classnames';

function Button({ children, className, apperence ='small',...props }:IButtonProps) {
	return (
		<button className={classNames(styles['button'], styles['accent'], className, {
			[styles['small']] : apperence === 'small',
			[styles['big']] : apperence === 'big'
		})} {...props}>{children}</button>
	);
}

export default Button;