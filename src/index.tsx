import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// when you only want to RTK-Query
// import { ApiProvider } from '@reduxjs/toolkit/query/react';
// import { apiSlice } from './redux/apiSlice';

// when you only want to RTK-Query with Redux-Toolkits
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <ApiProvider api={apiSlice}> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    {/* </ApiProvider> */}
  </React.StrictMode>
);
