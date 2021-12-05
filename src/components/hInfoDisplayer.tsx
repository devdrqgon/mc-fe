import { AlignmentOptions } from "./ui/Layout"
import HContainer from "./ui/Layout/HContainer"
import VContainer from "./ui/Layout/VContainer"

const HInfoDisplayer = (props: { _field: string, _value: string }) => {
    return (
        <>
            <VContainer  >

                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <h1>
                        {props._field}
                    </h1>
                    <h1>                        {props._value}

                    </h1>
                </HContainer>
            </VContainer>
        </>
    )
}

export default HInfoDisplayer
