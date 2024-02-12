import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import styles from './Menu.module.css';
import { PREFIX } from '../../helpers/API';
import { IProduct } from '../../interfaces/IProduct';
import { ChangeEvent, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';

export default function Menu() {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] =useState<string|undefined>();
	const [filter, setFilter] = useState<string>();

	const getMenu = async (name?:string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<IProduct[]>(`${PREFIX}/products`, {
				params: {
					name
				}
			});
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

	const updateFilter = (e:ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	useEffect(()=>{
		getMenu(filter);
	},[filter]);

	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав' onChange={updateFilter}></Search>
		</div>
		<div className={styles['body']}>
			{error && <>{error}</>}
			{!isLoading && products.length>0 && <MenuList products={products} />}
			{isLoading && <>Загружаем продукты...</>}
			{!isLoading && products.length === 0 && <>Не найдено блюд по запросу</>}
		</div>
	</>;
}