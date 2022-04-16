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
import { NewBill } from 'features/auth/SignInCard'

const getSum = (partialSum: number, a: NewBill) => partialSum + a.amount

const BillCard: React.FC = () => {
    const { openModal } = useContext(ModalContext)
    const { BillsUI } = useContext(DashboardContext)

    const onExpandCardClick = () => {
        openModal(
            <ExpandedBillCard

            />
        )
    }


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
                                {(BillsUI.bills.reduce(getSum, 0) + BillsUI.manualBills.reduce(getSum, 0) + BillsUI.paypalBills.reduce(getSum, 0)).toFixed(2)}
                            </Text>
                        </HContainer>
                        <HSpacer _space={6} />

                        <HContainer
                            justifyContent={AlignmentOptions.spaceBetween}>
                            <Text>
                                paid
                            </Text>
                            <Text>
                                200eur
                            </Text>
                        </HContainer>
                        <HContainer
                            justifyContent={AlignmentOptions.spaceBetween}>
                            <Text>
                                not yet
                            </Text>
                            <Text>
                                200eur
                            </Text>
                        </HContainer>
                    </Card>
                </>
            }
        </>
    )
}

export default BillCard
