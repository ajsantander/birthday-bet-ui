import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
