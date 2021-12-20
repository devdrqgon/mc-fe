import axios, { AxiosResponse } from 'axios'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { AlignmentOptions } from 'components/ui/Layout'
import HContainer from 'components/ui/Layout/HContainer'
import { useEffect, useState } from 'react'
import { Bill } from 'react-app-env'
import Text from 'components/ui/typography/Text'
import VContainer from 'components/ui/Layout/VContainer'
import HSpacer from 'components/ui/Layout/HSpacer'
import VSpacer from 'components/ui/Layout/VSpacer'
import styled from 'styled-components'
import MenuButton from 'components/ui/Controls/Buttons/MenuButton'


const PaidBillItem = (props: { _bill: Bill, _handleMarkAsUnpaid?: () => void }) => {
    const onClickedMarkAsUnpaid = () => {
        setshowLoadingBtn(true)
        setTimeout(() => {
            putBill({
                ...props._bill,
                paid: true,
            })
        }, 0);
    }
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
                props._handleMarkAsUnpaid!()
            }
            else {

            }
        } catch (error) {

        }
    }

    const [showLoadingBtn, setshowLoadingBtn] = useState(false)


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
            <VSpacer _space={15}>

            </VSpacer>
            <div>
                {props._bill.when}
            </div>
            <MenuButton/>



            {props._bill.paid === false ?
                <>
                    {showLoadingBtn === false ?
                        <CardButton onClick={onClickedMarkAsUnpaid}>
                            mark as Paid
                        </CardButton>
                        :
                        <CardButton  >

                        </CardButton>

                    }
                </>
                :
                <>

                </>
            }
        </BilLItemContainer>
    )
}

export default PaidBillItem

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