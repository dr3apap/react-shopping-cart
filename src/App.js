import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

//Contexts
import ProductContext from './Contexts/ProductContext';
import CartContext from './Contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(JSON.parse(window.localStorage.getItem('CART')) || []);

	const addItem = newItem => {
		setCart([...cart, newItem])
	};
	const removeItem = item => {
		console.log(item)
		setCart(cart.filter(currentItem => currentItem.id !== item))
	}

	useEffect(() => {
		window.localStorage.setItem('CART', JSON.stringify(cart))
	}, [cart])

	return (
		<ProductContext.Provider value={{ products, addItem }}>
			<CartContext.Provider value={{cart, removeItem}}>
		<div className="App">
			<Navigation cart={cart} />

			{/* Routes */}
			<Route
				exact
				path="/"
				component={Products}
			/>

			<Route
				path="/cart"
				component={ShoppingCart}
			/>
		</div>
		</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
