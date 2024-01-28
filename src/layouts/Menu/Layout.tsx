import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import classNames from 'classnames';

export function Layout() {


	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img src="./avatar.png" alt="Аватар" />
					<div className={styles['name']}>Александр Вьюгин</div>
					<div className={styles['email']}>noiker01@mail.ru</div>
				</div>
				<div className={styles['menu']}>
					<NavLink to="/" className={({ isActive }) => classNames(styles['link'], {
						[styles.active]:isActive
					})}>
						<img src="./menuIcon.svg" alt="Иконка меню" />
						Меню
					</NavLink>
					<NavLink to="/cart" className={({ isActive }) => classNames(styles['link'], {
						[styles.active]:isActive
					})}>
						<img src="./cartIcon.svg" alt="Иконка корзины" />
						Корзина
					</NavLink>
				</div>
				<Button className={styles['exit']}>
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
