import HInfoDisplayer from 'components/hInfoDisplayer'
import { Bill } from 'react-app-env'
import { RiBillLine } from 'react-icons/ri'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { getSumAllBills, getSumPaidills, getSumUnpaidBills } from 'features/lib'
import ExpandedBillCard from './expandedBillCard'
import ModalPortal from 'components/ui/Modal/PortalModal'
import ModalChild from 'components/ui/Modal/ModalChild'
import VContainer from 'components/ui/Layout/VContainer'
import HContainer from 'components/ui/Layout/HContainer'
import { AlignmentOptions } from 'components/ui/Layout'
import Card from 'components/ui/Layout/Card/Card'


const BillCard: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);


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
            <Card>
                <VContainer

                >
                    <HContainer justifyContent={AlignmentOptions.spaceBetween}>
                        <HContainer>
                            <RiBillLine />
                            <h1>
                                Bills
                            </h1>
                        </HContainer>
                        <BsArrowsAngleExpand onClick={() => { setModalOpen(true) }} style={{ 'cursor': 'pointer' }} />
                    </HContainer>
                    <>
                        {_bills !== null ?
                            <VContainer
                            >
                                <VContainer
                                >
                                    <HInfoDisplayer _field={"total"} _value={`€${getSumAllBills(_bills).toFixed(1)}`} />
                                    <HInfoDisplayer _field={"paid"} _value={`€${getSumPaidills(_bills).toFixed(1)}`} />
                                    <HInfoDisplayer _field={"not yet"} _value={`€${getSumUnpaidBills(_bills).toFixed(1)}`} />
                                </VContainer>
                            </VContainer>
                            :
                            <>
                                <HContainer
                                    justifyContent={AlignmentOptions.center}
                                    alignItems={AlignmentOptions.center}>
                                    {/* <LoadingMotion /> */}
                                </HContainer>
                            </>
                        }
                    </>
                </VContainer >
            </Card>
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
