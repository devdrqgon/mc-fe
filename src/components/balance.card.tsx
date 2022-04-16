
import PercentageDisplayer from "components/AmountDisplayer"
import HInfoDisplayer from "components/hInfoDisplayer"
import { FaBalanceScaleLeft } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'
import { AlignmentOptions } from "./ui/Layout"
import Card from "./ui/Layout/Card/Card"
import HContainer from "./ui/Layout/HContainer"
import Text from 'components/ui/typography/Text'
import HSpacer from "./ui/Layout/HSpacer"
import { useContext, useEffect } from "react"
import { DashboardContext } from "contextProviders/dashboard.provider"


const BalanceCard: React.FC = () => {

    const { userInfo, netto } = useContext(DashboardContext);

    useEffect(() => {
    }, [userInfo, netto])
    return (
        <>
            <Card
            >
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}
                >
                    <Text>balance</Text>
                    <span className="material-icons">
                        more_vert
                    </span>
                </HContainer>
                <HSpacer />
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>

                    <Text>
                        Gross
                    </Text>
                    <Text>
                        €{userInfo?.balance.gross.toFixed(1)}
                    </Text>
                </HContainer>
                <HSpacer _space={8} />

                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        Nett
                    </Text>
                    <Text>
                        €{userInfo?.balance.netto }
                    </Text>
                </HContainer>
                <HSpacer _space={8} />

                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        will save
                    </Text>
                    <Text>
                        €{userInfo?.willBeSaved }
                    </Text>
                </HContainer>
            </Card>
        </>
    )
}

export default BalanceCard



