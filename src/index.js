import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import App from './App';
import { store } from './app/store';

let persistor = persistStore(store);

ReactDOM.render(
<Router>
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
<App />
</PersistGate>
</Provider>
</Router>,
document.getElementById('root'));