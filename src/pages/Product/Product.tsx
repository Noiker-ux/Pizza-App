import { useLoaderData } from 'react-router-dom';
import { IProduct } from '../../interfaces/IProduct';

export function Product() {
	const data = useLoaderData() as IProduct;

	return <>
		Product - {data.name}
	</>;
}