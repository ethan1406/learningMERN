import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
  <App initialData={window.initialData} />,
  document.getElementById('root')
);


// setTimeout(() => {
// 	ReactDom.render(
// 		<h2> ...</h2>,
// 		document.getElementById('root')
// 	);


// }, 4000);