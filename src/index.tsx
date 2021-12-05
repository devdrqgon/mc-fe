import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from 'contexts/user.context';
import { App } from 'App';
import CardButton from 'components/ui/Controls/Buttons/CardButtons';
import { ThemeProvider } from 'styled-components';
import dark from 'styles/themes/dark';
import GlobalStyle from './styles/global'
import ModalPortal from 'components/ui/Modal/PortalModal';
import ModalChild from 'components/ui/Modal/ModalChild';
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
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>
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