import { Bill } from 'react-app-env'
import styled from 'styled-components'
import  { SimpleOption, WithConfirmCancelOption } from 'components/ui/Controls/Buttons/MenuButton'
import BaseBillItem from './BaseBillItem'
import { putBill } from 'apis/bill'


const PaidBillItem = (props: { _bill: Bill }) => {
    const onClickedMarkAsUnpaid = () => {
        setTimeout(() => {
            putBill({
                ...props._bill,
                paid: false,
            })
        }, 0);
    }

    const markAsUnpaidOption: WithConfirmCancelOption = {
        optionName: "Mark as unpaid",
        _onConfirmClick: onClickedMarkAsUnpaid
    }
    const editOption: SimpleOption = {
        optionName: "Edit Bill",
        _onClick: () => { alert('_onClick on paidBill') }
    }
    const _menuOptions: (SimpleOption | WithConfirmCancelOption)[] = [
        markAsUnpaidOption,
        editOption
    ]
    return (
        <BaseBillItem _bill={props._bill} _menuOptions={_menuOptions} />
    )
}

export default PaidBillItem
