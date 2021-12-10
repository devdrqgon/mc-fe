import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from 'contexts/user.context';
import { App } from 'App';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
    <App/>
    </UserProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

