import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { IProductCardProps } from './ProductCard.props';
import { MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartAction } from '../../store/card.slice';

function ProductCard(props: IProductCardProps){
	const dispath = useDispatch<AppDispath>();

	const add = (e:MouseEvent) => {
		e.preventDefault();
		dispath(cartAction.add(props.id));
	};

	return(
		<Link to={`/product/${props.id}`} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{backgroundImage: `url('${props.image}')`}}>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']} onClick={add}>
						<img src="./bagIcon.svg" alt="Иконка корзины" />
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img src="./starIcon.svg" alt="Иконка рейтинга" />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.name}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}
export default ProductCard;