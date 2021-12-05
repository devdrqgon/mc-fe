import axios, { AxiosResponse } from 'axios'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { AlignmentOptions } from 'components/ui/Layout'
import HContainer from 'components/ui/Layout/HContainer'
import { useEffect, useState } from 'react'
import { Bill } from 'react-app-env'

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
        <HContainer justifyContent={AlignmentOptions.spaceBetween}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',

                }}
            >
                <div>
                    <h1>
                        {props._bill.billName}
                    </h1>

                </div>
                <div>
                    <h1>
                        bill
                    </h1>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
            >
                <div>
                    <h6>
                        {props._bill.cost}
                    </h6>

                </div>
                <div>
                    cost
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
            >
                <div>
                    <h6>{props._bill.when}</h6>
                </div>
                <div>
                    <h6> Day of month</h6>
                </div>
            </div>
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
