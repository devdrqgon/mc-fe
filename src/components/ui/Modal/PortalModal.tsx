import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
 position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5eaea;
  min-height: 200px;
  min-width: 400px;
  z-index: 1000;
  padding: 15px;
`;


const Overlay = styled.div`
position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .7);
  `
type Props = {
  modalOpen: boolean;
};

const ModalPortal: React.FC<Props> = ({ modalOpen, children }) => {
  if (!modalOpen) return null;

  return createPortal(
    <>
      <Overlay></Overlay>

      <Wrapper>
        <div>{children}</div>
      </Wrapper>
    </>,
    document.body
  );
};

export default ModalPortal