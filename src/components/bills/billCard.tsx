import { Box, HStack, VStack, Divider, Text, Flex } from '@chakra-ui/layout'
import HInfoDisplayer from 'components/hInfoDisplayer'
import { Bill } from 'react-app-env'
import { RiBillLine } from 'react-icons/ri'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import LoadingMotion from 'components/loadingMotion'
import axios, { AxiosResponse } from 'axios'
import { getSumAllBills, getSumPaidills, getSumUnpaidBills } from 'features/lib'
import { useDisclosure } from '@chakra-ui/hooks'
import ExpandedBillCard from './expandedBillCard'
import ModalPortal from 'components/ui/portalModal/PortalModal'
import ModalChild from 'components/ui/portalModal/ModalChild'


const BillCard: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);


    const { isOpen, onOpen, onClose } = useDisclosure({ id: 'billsModal' })
    const [_bills, set_bills] = useState<Bill[] | null>(null)

    const refreshbills = () => {
        getBills()
    }
    const getBills = async () => {
        try {
            const response: AxiosResponse<any, any> = await axios({
                method: 'GET',
                url: `http://localhost:8000/bills/get/all/${localStorage.getItem('username')}`,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })
            if (response.status === 200) {
                console.info("bills", response.data.bills[0].bills)
                set_bills(response.data.bills[0].bills)
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        setTimeout(() => {
            getBills()
        }, 1000);
    }, [])

    return (
        <>
            <Flex
                direction="column"
                p={6}
                m={3}
                w={'full'}
                boxShadow="base"
                rounded={'lg'}
                pos={'relative'}
                zIndex={1}>
                <HStack justifyContent={'space-between'}>
                    <HStack>
                        <RiBillLine />
                        <Text minW={"200px"} color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                            Bills
                        </Text>
                    </HStack>
                    <BsArrowsAngleExpand onClick={() => { setModalOpen(true) }} style={{ 'cursor': 'pointer' }} />
                </HStack>
                <>
                    {_bills !== null ?
                        <VStack
                            alignItems="flex-start">
                            <Divider mt={2} orientation={'horizontal'}></Divider>
                            <VStack
                                pr={3}
                                pl={3}
                                pb={1}
                                rounded={'lg'}
                                w={"full"}
                                alignItems="flex-start">
                                <HInfoDisplayer _field={"total"} _value={`€${getSumAllBills(_bills).toFixed(1)}`} />
                                <HInfoDisplayer _field={"paid"} _value={`€${getSumPaidills(_bills).toFixed(1)}`} />
                                <HInfoDisplayer _field={"not yet"} _value={`€${getSumUnpaidBills(_bills).toFixed(1)}`} />

                            </VStack>
                        </VStack>
                        :
                        <>
                            <Flex
                                h="full"
                                justifyContent="center"
                                alignItems="center">
                                <LoadingMotion />
                            </Flex>
                        </>
                    }
                </>

            </Flex >
            <ModalPortal modalOpen={modalOpen}>
                <ModalChild setModalOpen={setModalOpen} >
                    <ExpandedBillCard
                        _handleOnClickPayBill={refreshbills}
                        _bills={_bills!} />
                </ModalChild>
            </ModalPortal>
        </>
    )
}

export default BillCard
