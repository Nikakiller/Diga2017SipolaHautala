import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppComponent from './AppComponent';
import registerServiceWorker from './registerServiceWorker';
window.jQuery = window.$ = require('jquery/dist/jquery.min');
require('bootstrap/dist/js/bootstrap.min.js');

ReactDOM.render(<AppComponent />, document.getElementById('root'));
registerServiceWorker();
