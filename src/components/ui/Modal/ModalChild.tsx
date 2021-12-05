import BillCreator from 'components/bills/billCreator';
import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai'
import IconContainer from '../Layout/IconContainer';
import HContainer from '../Layout/HContainer';
import { AlignmentOptions } from '../Layout';


type Props = {
    setModalOpen: any;
};

const ModalChild: React.FC<Props> = ({ setModalOpen, children }) => (
    <>
        <HContainer justifyContent={AlignmentOptions.flexEnd}>
            <IconContainer>
                <AiOutlineClose
                    onClick={() => setModalOpen(false)} />
            </IconContainer>
        </HContainer>
        <span>{children}</span>
    </>
);

export default ModalChild;