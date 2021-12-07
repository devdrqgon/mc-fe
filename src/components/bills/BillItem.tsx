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
const BillItem = (props: { _bill: Bill, _handleMarkAspaid?: () => void }) => {
    const onClickedMarkAsPaid = () => {
        setshowLoadingBtn(true)
        setTimeout(() => {
            putBill({
                ...props._bill,
                paid: true,
            })
        }, 0);


        // if (props._handleMarkAspaid) {
        //     setshowLoadingBtn(true)
        //     props._handleMarkAspaid(props._bill)
        // }
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
                props._handleMarkAspaid!()
            }
            else {

            }
        } catch (error) {

        }
    }

    const [showLoadingBtn, setshowLoadingBtn] = useState(false)
    const renderpayBtn = () => {
        // update bill in be 
    }
    return (
        <HContainer style={{
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);'
        }} justifyContent={AlignmentOptions.spaceBetween}
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
            <VContainer
                justifyContent={AlignmentOptions.center}
                alignItems={AlignmentOptions.center}

            >
                <HSpacer _space={1}></HSpacer>
                <div>
                    {props._bill.when}
                </div>

            </VContainer>



            {props._bill.paid === false ?
                <>
                    {showLoadingBtn === false ?
                        <CardButton onClick={onClickedMarkAsPaid}>
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
        </HContainer>
    )
}

export default BillItem
