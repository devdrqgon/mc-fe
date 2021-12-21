import { Bill } from 'react-app-env'
import { SimpleOption, WithConfirmCancelOption } from 'components/ui/Controls/Buttons/MenuButton'
import BaseBillItem from './BaseBillItem'
import axios, { AxiosResponse } from 'axios'
import { DashboardContext } from 'contextProviders/dashboard.provider'
import { useContext } from 'react'


const UnpaidBillItem = (props: { _bill: Bill }) => {
    const { refreshUserInfo } = useContext(DashboardContext)

    const putBill = async (b: Bill) => {
        try {
            const response: AxiosResponse<any, any> = await axios({
                method: 'PUT',
                url: `http://localhost:8000/bills/${b._id}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    billName: b.billName,
                    username: b.username,
                    paid: b.paid,
                    cost: b.cost,
                    when: b.when
                },
            })
            console.info("bill update response", response)
            if (response.status === 200) {
                // alert("PUT Success")
                refreshUserInfo()

            }
            else {

            }
        } catch (error) {

        }
    }

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
        // editOption
    ]
    return (
        <BaseBillItem _bill={props._bill} _menuOptions={_menuOptions} />
    )
}

export default UnpaidBillItem
