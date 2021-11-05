import React from 'react';
import ReactDOM from 'react-dom';
import Mcapp from 'mcapp';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Mcapp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

