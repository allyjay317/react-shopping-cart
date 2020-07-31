import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

import { ProductContext, CartContext } from './contexts'

function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState(() => {
		const local = localStorage.getItem('shopping-cart')
		return local ? JSON.parse(local) : []
	});

	useEffect(() => {
		localStorage.setItem('shopping-cart', JSON.stringify(cart))
	}, [cart])



	const addItem = item => {
		setCart([...cart, item])
	};

	const removeItem = id => {
		debugger
		let newCart = cart.filter(i => i.id !== id)
		setCart(newCart)
	}

	return (

		<div className="App">
			<CartContext.Provider value={{ cart, removeItem }}>
				<Navigation />
				<Route path="/cart">
					<ShoppingCart />
				</Route>
			</CartContext.Provider>

			{/* Routes */}
			<ProductContext.Provider value={{ products, addItem }}>
				<Route exact path="/">
					<Products />
				</Route>


			</ProductContext.Provider>
		</div>
	);
}

export default App;
