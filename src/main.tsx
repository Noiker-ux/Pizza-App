import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Layout } from './layouts/Menu/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Suspense fallback={<>Загрузка...</>}><Menu /></Suspense>
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				}
			}
		]
	},
	{
		path: '*',
		element: <Error />
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
