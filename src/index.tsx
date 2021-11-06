import React from 'react';
import ReactDOM from 'react-dom';
import Mcapp from 'mcapp';
import { BrowserRouter } from 'react-router-dom';
import EntryComponent from 'entryComponent';
import UserProvider from 'contexts/user.context';


ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <EntryComponent />
    </BrowserRouter>
  </UserProvider>,
  document.getElementById('root')
);

