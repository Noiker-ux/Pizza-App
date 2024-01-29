import ProductCard from '../../../components/ProductCard/ProductCard';
import { IMenuListProps } from './MenuList.props';

export default function MenuList({ products }: IMenuListProps){
	return (
		products.map(e => (
			<ProductCard
				key={e.id} 
				id={e.id} 
				name={e.name} 
				description={e.ingredients.join(', ')} 
				rating={e.rating} 
				price={e.price} 
				image={e.image}/>
		))
	);
}