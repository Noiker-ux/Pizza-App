import { forwardRef } from 'react';
import styles from './Search.module.css';
import classNames from 'classnames';
import { ISearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, ISearchProps>(function Search({ isValid = true, className, ...props }, ref) {
	return (
		<div className={styles['input-wrapper']}>
			<input ref={ref} className={classNames(styles['input'], className, {
				[styles['invalid']]: isValid
			})} {...props}/>
			<img className={styles['icon']} src="./searchIcon.svg" alt="Иконка поиска" />
		</div>
	);
});

export default Search;