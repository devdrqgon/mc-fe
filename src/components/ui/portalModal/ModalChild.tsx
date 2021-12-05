import BillCreator from 'components/bills/billCreator';
import React from 'react';
import styled from 'styled-components';
import HContainer, { JustifyContentVariants } from '../containers/HContainer';
import { AiOutlineClose } from 'react-icons/ai'
import IconContainer from '../containers/IconContainer';


type Props = {
    setModalOpen: any;
};

const ModalChild: React.FC<Props> = ({ setModalOpen, children }) => (
    <>
        <HContainer justify={JustifyContentVariants.flexEnd}>
            <IconContainer>
                <AiOutlineClose
                    onClick={() => setModalOpen(false)} />
            </IconContainer>
        </HContainer>
        <span>{children}</span>
    </>
);

export default ModalChild;