import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import { IProductCardProps } from './ProductCard.props';

function ProductCard(props: IProductCardProps){
	return(
		<Link to={''} className={styles['link']}>
			<div className={styles['card']}>
				<div className={styles['head']} style={{backgroundImage: `url('${props.image}')`}}>
					<div className={styles['price']}>
						{props.price}&nbsp;
						<span className={styles['currency']}>₽</span>
					</div>
					<button className={styles['add-to-cart']}>
						<img src="./bagIcon.svg" alt="Иконка корзины" />
					</button>
					<div className={styles['rating']}>
						{props.rating}&nbsp;
						<img src="./starIcon.svg" alt="Иконка рейтинга" />
					</div>
				</div>
				<div className={styles['footer']}>
					<div className={styles['title']}>{props.title}</div>
					<div className={styles['description']}>{props.description}</div>
				</div>
			</div>
		</Link>
	);
}
export default ProductCard;