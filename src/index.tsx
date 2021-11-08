import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EntryComponent from 'entryComponent';
import UserProvider from 'contexts/user.context';


ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <EntryComponent />
    </UserProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

