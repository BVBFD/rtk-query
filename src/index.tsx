import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// when you only want to RTK-Query
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { apiSlice } from './redux/apiSlice';

// when you only want to RTK-Query with Redux-Toolkits
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <ApiProvider api={apiSlice}> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </ApiProvider> */}
  </React.StrictMode>
);
