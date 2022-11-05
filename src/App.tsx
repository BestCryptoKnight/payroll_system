import React from 'react'

import { Routes, Route, Link } from 'react-router-dom'
/* import Cookies from 'universal-cookie' */

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './Layout'
import Home from './Home'
import Payment from './Payment'
import './App.css';
function NoMatch() {
	return (
		<div style={{ maxWidth: "1100px", margin: "50px auto" }}>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to="/" style={{ color: "#d090f0" }}> {"<"} Go to the home page</Link>
			</p>
		</div>
	)
}

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/">
					<Route index element={<Payment />} />
					<Route path='*' element={<NoMatch />} />
				</Route>
			</Routes>
			<ToastContainer />
		</Layout>
	)
}

export default App