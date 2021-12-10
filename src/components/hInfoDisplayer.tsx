import { AlignmentOptions } from "./ui/Layout"
import HContainer from "./ui/Layout/HContainer"
import VContainer from "./ui/Layout/VContainer"
import Text from 'components/ui/typography/Text'

const HInfoDisplayer = (props: { _field: string, _value: string }) => {
    return (
        <>
            <HContainer
                justifyContent={AlignmentOptions.spaceBetween}>
                <Text>
                    {props._field}
                </Text>
                <Text>
                    {props._value}
                </Text>
            </HContainer>
        </>
    )
}

export default HInfoDisplayer
