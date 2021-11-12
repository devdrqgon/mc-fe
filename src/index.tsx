import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EntryComponent from 'entryComponent';
import UserProvider from 'contexts/user.context';
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <EntryComponent />
    </UserProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

