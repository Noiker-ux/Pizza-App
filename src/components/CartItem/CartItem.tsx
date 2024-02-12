
import styles from './CartItem.module.css';
import { ICartItemProps } from './CartItem.props';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartAction } from '../../store/card.slice';

function CartItem(props: ICartItemProps){
	const dispath = useDispatch<AppDispath>();

	const increase = () => {
		dispath(cartAction.add(props.id));
	};

	const descrease = () => {
		dispath(cartAction.remove(props.id));
	};

	const remove = () => {
		dispath(cartAction.delete(props.id));
	};

	return(
		<div className={styles['item']}>
			<div className={styles['image']} style={{backgroundImage: `url('${props.image}')`}}></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['minus']} onClick={descrease}>
					<img src="./minus.svg" alt="Удалить из корзины" />
				</button>
				<div className={styles['number']}>{props.count}</div>
				<button className={styles['plus']} onClick={increase}>
					<img src="./plus.svg" alt="Добавить в корзину" />
				</button>
				<button className={styles['remove']} onClick={remove}>
					<img src="./delete.svg" alt="Удалить все" />
				</button>
			</div>
		</div>
	);
}
export default CartItem;