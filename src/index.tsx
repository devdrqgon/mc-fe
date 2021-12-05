import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from 'contexts/user.context';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from 'App';
import ClonedModal from 'components/ui/clonedModal/clonedModal';
import CardButton from 'components/ui/CardButtons';
import { ThemeProvider } from 'styled-components';
import dark from 'styles/themes/dark';
import GlobalStyle from './styles/global'
import ModalPortal from 'components/ui/portalModal/PortalModal';
import ModalChild from 'components/ui/portalModal/ModalChild';
import { useState } from 'react';
import BillCreator from 'components/bills/billCreator';

export const ModalTester = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ModalPortal modalOpen={modalOpen}>
        <ModalChild setModalOpen={setModalOpen} >
          <BillCreator></BillCreator>
        </ModalChild>
      </ModalPortal>
      <CardButton
        onClick={() => setModalOpen(true)}
      >
        Open Modal
      </CardButton>
    </>
  )
}

ReactDOM.render(
  <ChakraProvider>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </ChakraProvider>
  ,
  document.getElementById('root')
);


// <ThemeProvider theme={dark}>
// <GlobalStyle />
//   <CardButton  >
//     Open Modal
//   </CardButton>
//   <MyModal />
// </ThemeProvider>