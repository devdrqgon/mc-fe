import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from 'contexts/user.context';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from 'App';


ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <UserProvider>
        <App/>
      </UserProvider>
    </BrowserRouter>
  </ChakraProvider>

  ,
  document.getElementById('root')
);

