import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { MetaMaskProvider } from 'metamask-react';
// import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

// import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import './index.scss';
import './responsive.scss';

ReactDOM.render(
	// <Provider store={store}>
	<React.StrictMode>
		<BrowserRouter>
			<MetaMaskProvider>
				<App />
			</MetaMaskProvider>
		</BrowserRouter>
	</React.StrictMode>,
	// </Provider>,
	document.getElementById('root')
);

reportWebVitals();
