import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ContextProvider } from './context.jsx';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';
import { IKContext } from 'imagekitio-react';

const urlEndpoint = 'https://ik.imagekit.io/lyhvtcigz/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IKContext urlEndpoint={urlEndpoint}>
      <ContextProvider>
        <App />
        <ToastContainer position="top-center" transition={Slide} />
      </ContextProvider>
    </IKContext>
  </React.StrictMode>
);
