import MenuButton, { SimpleOption, WithConfirmCancelOption } from 'components/ui/Controls/Buttons/MenuButton';
import { AlignmentOptions } from 'components/ui/Layout';
import VContainer from 'components/ui/Layout/VContainer';
import VSpacer from 'components/ui/Layout/VSpacer';
import React from 'react'
import { Bill } from 'react-app-env';
import styled from 'styled-components';
type Props = {
    _bill: Bill,
    _menuOptions: (SimpleOption | WithConfirmCancelOption)[]
}
const BaseBillItem: React.FC<Props> = (props) => {
    return (
        <BilLItemContainer
        >
            <VContainer
                justifyContent={AlignmentOptions.flexStart}
            >
                <div>
                    {props._bill.billName}
                </div>
                <div>
                    €{props._bill.cost.toFixed(1)}
                </div>
            </VContainer>
            <VSpacer _space={15} />
            <div>
                {props._bill.when}
            </div>
            <MenuButton _options={props._menuOptions} />
        </BilLItemContainer>
    )
}

export default BaseBillItem


const BilLItemContainer = styled.div`
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        padding: 2px 2px;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        min-width: 350px;
        margin: 10px 0;
        cursor: pointer;

  &:hover {
    box-shadow: 0 12px 23px rgba(0, 0, 0, 0.23), 0 10px 10px rgba(0, 0, 0, 0.19);
  }
`;
