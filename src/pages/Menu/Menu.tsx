import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/IProduct';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';

export function Menu() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] =useState<string|undefined>();

	const getMenu = async () => {
		try {
			setIsLoading(true);
			await new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				},1000);
			});
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`);
			setProducts(data);
			setIsLoading(false);
		} catch(e) {
			console.error(e);
			if (e instanceof AxiosError){
				setError(e.message);
			}
			setIsLoading(false);
			return;	
		}
	};

	useEffect(()=>{
		getMenu();
	},[]);

	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав'></Search>
		</div>
		<div className={styles['body']}>
			{error && <>{error}</>}
			{!isLoading && <MenuList products={products} />}
			{isLoading && <>Загружаем продукты...</>}
		</div>
	</>;
}