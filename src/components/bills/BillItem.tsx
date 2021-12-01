import { Button, Flex, Text } from '@chakra-ui/react'
import { Bill } from 'react-app-env'

const BillItem = (props: {_bill : Bill}) => {
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
            <div>
                <Button>
                    mark as Paid
                </Button>
            </div>
        </Flex>
    )
}

export default BillItem
