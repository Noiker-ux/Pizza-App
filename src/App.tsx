import './App.css';
import Button from './components/Button/Button';
import Input from './components/Input/Input';


function App() {
	return (
		<>
			<Button apperence='big'>Кнопка</Button>
			<Button apperence='small'>Кнопка</Button>
			<Input placeholder='Email' />
		</>
	);
}

export default App;
