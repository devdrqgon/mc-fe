import HInfoDisplayer from 'components/hInfoDisplayer'
import { Bill } from 'react-app-env'
import { RiBillLine } from 'react-icons/ri'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { useContext, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { BillsHelpers } from 'features/lib'
import ExpandedBillCard from './expandedBillCard'
import HContainer from 'components/ui/Layout/HContainer'
import { AlignmentOptions } from 'components/ui/Layout'
import Card from 'components/ui/Layout/Card/Card'
import Text from 'components/ui/typography/Text'
import HSpacer from 'components/ui/Layout/VSpacer'
import { ModalContext } from 'contextProviders/modal.provider'
import { DashboardContext } from 'contextProviders/dashboard.provider'


const BillCard: React.FC = () => {
    const { openModal } = useContext(ModalContext)
    const { BillsUI } = useContext(DashboardContext)

    const onExpandCardClick = () => {
        openModal(
            <ExpandedBillCard

            />
        )
    }


    // const [_bills, set_bills] = useState<Bill[] | null>(null)


    // const getBills = async () => {
    //     try {
    //         const response: AxiosResponse<any, any> = await axios({
    //             method: 'GET',
    //             url: `http://localhost:8000/bills/get/all/${localStorage.getItem('username')}`,
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`
    //             },
    //         })
    //         if (response.status === 200) {
    //             console.info("bills", response.data.bills[0].bills)
    //             set_bills(response.data.bills[0].bills)
    //         }

    //     } catch (error) {

    //     }
    // }



    return (
        <>
            {BillsUI === null ?
                <>
                    <h1>
                        BillsUI === null
                    </h1>
                </>
                :
                <>
                    <Card>
                        <HContainer justifyContent={AlignmentOptions.spaceBetween}>
                            <Text>
                                Bills
                            </Text>
                            <BsArrowsAngleExpand onClick={onExpandCardClick} style={{ 'cursor': 'pointer' }} />
                        </HContainer>
                        <HSpacer _space={50} />
                        <HContainer
                            justifyContent={AlignmentOptions.spaceBetween}>
                            <Text>
                                total
                            </Text>
                            <Text>
                                €{BillsHelpers.getSumAllBills(BillsUI).toFixed(1)}
                            </Text>
                        </HContainer>
                        <HSpacer _space={6} />

                        <HContainer
                            justifyContent={AlignmentOptions.spaceBetween}>
                            <Text>
                                paid
                            </Text>
                            <Text>
                                €{BillsHelpers.getSumPaidills(BillsUI).toFixed(1)}
                            </Text>
                        </HContainer>
                        <HContainer
                            justifyContent={AlignmentOptions.spaceBetween}>
                            <Text>
                                not yet
                            </Text>
                            <Text>
                                €{BillsHelpers.getSumUnpaidBills(BillsUI).toFixed(1)}
                            </Text>
                        </HContainer>
                    </Card>
                </>
            }
        </>
    )
}

export default BillCard
