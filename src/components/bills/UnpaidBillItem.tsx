import { Bill } from 'react-app-env'
import  { SimpleOption, WithConfirmCancelOption } from 'components/ui/Controls/Buttons/MenuButton'
import BaseBillItem from './BaseBillItem'
import { putBill } from 'apis/bill'


const UnpaidBillItem = (props: { _bill: Bill }) => {
    const onClickedMarkAsPaid = () => {
        setTimeout(() => {
            putBill({
                ...props._bill,
                paid: true,
            })
        }, 0);
    }

    const markAsUnpaidOption: WithConfirmCancelOption = {
        optionName: "Mark as paid",
        _onConfirmClick: onClickedMarkAsPaid
    }
    const editOption: SimpleOption = {
        optionName: "Edit Bill",
        _onClick: () => { alert('_onClick on unpaidBill') }
    }
    const _menuOptions: (SimpleOption | WithConfirmCancelOption)[] = [
        markAsUnpaidOption,
        editOption
    ]
    return (
        <BaseBillItem _bill={props._bill} _menuOptions={_menuOptions} />
    )
}

export default UnpaidBillItem
