import React from 'react';
import ReactDOM from 'react-dom/client';
import AvatarApp from './App';
import { Toaster } from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AvatarApp />
    <Toaster position="bottom-right" />
  </React.StrictMode>
);
