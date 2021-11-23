import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EntryComponent from 'entryComponent';
import UserProvider from 'contexts/user.context';
import { ChakraProvider, Container } from '@chakra-ui/react';
import theme from 'theme';


ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <UserProvider>
      <EntryComponent />
      </UserProvider>
    </BrowserRouter>
  </ChakraProvider>

  ,
  document.getElementById('root')
);

