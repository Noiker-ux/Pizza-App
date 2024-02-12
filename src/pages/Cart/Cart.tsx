import { useDispatch, useSelector } from 'react-redux';
import Headling from '../../components/Headling/Headling';
import { AppDispath, RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaces/IProduct';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartAction } from '../../store/card.slice';

const DELIVERY_FEE = 169;

export function Cart() {
	const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
	const items = useSelector((s:RootState) => s.card.items);
	const jwt = useSelector((s:RootState) => s.user.jwt);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();


	const total = items.map(i => {
		const product = cartProducts.find(p => p.id == i.id);
		if (!product){
			return 0;
		}
		return i.count* product.price;
	}).reduce((acc,i) => acc += i,0);

	const getItem = async (id:number) => {
		const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
		return data;
	};


	const loadAllItems = async() => {
		const res = await Promise.all(items.map(e => getItem(e.id)));
		setCartProducts(res);
	};

	useEffect(()=>{
		loadAllItems();
	},[items]);


	const checkout = async () => {
		const { data } = axios.post(`${PREFIX}/order`, {
			products: items 
		},{
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		dispatch(cartAction.clean());
		navigate('/success');
	};

	return <>
		<Headling className={styles['headling']}>Корзина</Headling>
		{items.map(i => {
			const product = cartProducts.find(p => p.id == i.id);
			if (!product){
				return;
			}
			return <CartItem key={product.id} count={i.count} {...product} />;
		})}
		<div className={styles['line']}>
			<div className={styles['text']}>Сумма заказа:</div>
			<div className={styles['price']}>{total}&nbsp;<span>₽</span></div>
		</div>
		<hr className={styles['hr']}/>
		<div className={styles['line']}>
			<div className={styles['text']}>Доставка</div>
			<div className={styles['price']}>{DELIVERY_FEE}&nbsp;<span>₽</span></div>
		</div>
		<hr className={styles['hr']}/>
		<div className={styles['line']}>
			<div className={styles['text']}>Итог <span className={styles['total-count']}>({items.length})</span></div>
			<div className={styles['price']}>{total+DELIVERY_FEE}&nbsp;<span>₽</span></div>
		</div>
		<div className={styles['checkout']}>
			<Button apperence="big" onClick={checkout}>ОФОРМИТЬ</Button>
		</div>
	</>;
}