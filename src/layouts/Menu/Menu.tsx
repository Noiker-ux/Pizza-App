import { Link, Outlet } from 'react-router-dom';

export function Layout() {
	return <>			
		<div>
			<Link to='/menu'>Меню</Link>
			<Link to='/cart'>Корзина</Link>
		</div>
		<div>
			<Outlet />
		</div>
	</>;
}