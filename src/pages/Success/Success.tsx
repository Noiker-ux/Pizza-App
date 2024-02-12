import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import style from './Success.module.css';

export default function Success () {
	const navigate = useNavigate();

	return (
		<div className={style['success']}>
			<img src="/Success.png" alt="Pizza's image" />
			<div className={style['text']}>Ваш заказ успешно оформлен</div>
			<Button apperence="big" onClick={() => navigate('/')}>Сделать новый</Button>
		</div>
	);
}