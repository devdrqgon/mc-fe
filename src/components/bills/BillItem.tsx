import { Button, Flex, Spinner, Text } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
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
        <Flex
            boxShadow={'xs'}
            justify="space-between"
            p={3}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',

                }}
            >
                <div>
                    <Text fontSize='xl'> {props._bill.billName}</Text>


                </div>
                <div>
                    <Text fontSize='xs' color='gray.500'>bill</Text>

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
                    <Text fontSize='xl'> {props._bill.cost}</Text>

                </div>
                <div>
                    <Text fontSize='xs' color='gray.500'>cost</Text>
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
                    <Text fontSize='xl'> {props._bill.when}</Text>
                </div>
                <div>
                    <Text fontSize='xs' color='gray.500'>  Day of month</Text>

                </div>
            </div>
            {props._bill.paid === false ?
                <>
                    {showLoadingBtn === false ?
                        <Button w={110} onClick={onClickedMarkAsPaid}>
                            mark as Paid
                        </Button>
                        :
                        <Button w={110} >
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="sm"
                            />
                        </Button>

                    }
                </>
                :
                <>

                </>
            }
        </Flex>
    )
}

export default BillItem
