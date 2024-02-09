import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispath, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

export function Layout() {

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();
	const profile = useSelector((s:RootState) => s.user.profile);
	const items = useSelector((s:RootState) => s.card.items);

	useEffect(() => {
		dispatch(getProfile());
	}, [dispatch]);

	const logout = () => {
		dispatch(userActions.logoutUserSlice());
		navigate('/auth/login');
	};

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img src="./avatar.png" alt="Аватар" />
					<div className={styles['name']}>{profile?.name}</div>
					<div className={styles['email']}>{profile?.email}</div>
				</div>
				<div className={styles['menu']}>
					<NavLink to="/" className={({ isActive }) => classNames(styles['link'], {
						[styles.active]:isActive
					})}>
						<img src="./menuIcon.svg" alt="Иконка меню" />
						Меню {items.reduce((acc, i ) => acc+=i.count ,0)}
					</NavLink>
					<NavLink to="/cart" className={({ isActive }) => classNames(styles['link'], {
						[styles.active]:isActive
					})}>
						<img src="./cartIcon.svg" alt="Иконка корзины" />
						Корзина
					</NavLink>
				</div>
				<Button className={styles['exit']} onClick={logout}>
					<img src="./exitIcon.svg" alt="Иконка выхода" />
					Выход
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet />
			</div>
		</div>
	);
}

