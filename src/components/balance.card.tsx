
import PercentageDisplayer from "components/AmountDisplayer"
import HInfoDisplayer from "components/hInfoDisplayer"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { AlignmentOptions } from "./ui/Layout"
import Card from "./ui/Layout/Card"
import HContainer from "./ui/Layout/HContainer"
import VContainer from "./ui/Layout/VContainer"



interface BalanceCardProps {
    _mainAccountTotalBalance: number
    _nett: number
    _unpaidBills: number
}
const BalanceCard: React.FC<BalanceCardProps> = (props) => {
    return (
        <>
            <Card
            >
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        alignContent: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <div
                        style={{
                            width: '100%',

                            display: 'flex',
                            justifyContent: 'space-between',

                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',

                            }}>
                            <FaBalanceScaleLeft />
                            <h1>
                                Balance

                            </h1>
                        </div>

                        <HiDotsVertical style={{ 'cursor': 'pointer' }} />
                    </div>
                    <VContainer>
                        <VContainer>
                            <HInfoDisplayer _field={"Main"} _value={`€${props._mainAccountTotalBalance.toFixed(2)}`} />
                            <PercentageDisplayer _nett={props._nett} _unpaidBills={props._unpaidBills} />

                        </VContainer>
                    </VContainer>
                </div>
            </Card>
        </>
    )
}



export default BalanceCard