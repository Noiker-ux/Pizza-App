import styles from './Headling.module.css';
import { IHeadlingProps } from './Headling.props';
import classNames from 'classnames';

const Headling = function Input({children, className, ...props}:IHeadlingProps) {
	return (
		<h1 {...props} className={classNames(styles['h1'], className)}>{children}</h1>
	);
};

export default Headling;