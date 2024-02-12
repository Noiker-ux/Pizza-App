import { useLoaderData, useNavigate } from 'react-router-dom';
import { IProduct } from '../../interfaces/IProduct';
import style from './Product.module.css';
import Button from '../../components/Button/Button';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartAction } from '../../store/card.slice';

export function Product() {
	const data = useLoaderData() as IProduct;
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispath>();

	const add = () => {
		dispatch(cartAction.add(data.id));
	};

	return(
		<>
			<div className={style['header']}>
				<div className={style['header-left']}>
					<div className={style['back']} onClick={() => { navigate('/'); }}>
						<img src="/Back.svg" alt="Back" />
					</div>
					<span className={style['title']}>{data.name}</span>
				</div>
				<Button className={style['add']} onClick={add}><img src='/bagIcon.svg' alt='Иконка добавить'  />В корзину</Button>
			</div>
			<div className={style['detail']}>
				<img className={style['image']} src={data.image} alt={data.name} />
				<div className={style['description']}>
					<div className={style['line']}>
						<div className={style['text']}>Цена</div>
						<div className={style['price']}>{data.price}&nbsp;<span>₽</span></div>
					</div>
					<hr className={style['hr']}/>
					<div className={style['line']}>
						<div className={style['text']}>Рейтинг</div>
						<div className={style['priceAround']}>{data.rating} <img src="/starIcon.svg" alt="Иконка рейтинга" /></div>
					</div>
					<hr className={style['hr']} />
					<div className={style['ingridients']}>
						<div className={style['ingridients-title']}>
							Состав
						</div>
						<ul className={style['list-ingidients']}>
							{data.ingredients.map(e => <li key={e} className={style['item-ingidient']}>{e}</li>)}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}