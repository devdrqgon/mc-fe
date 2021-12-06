import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { AlignmentOptions } from 'components/ui/Layout'
import Card from 'components/ui/Layout/Card/Card'
import HContainer from 'components/ui/Layout/HContainer'
import VContainer from 'components/ui/Layout/VContainer'
import { HiDotsVertical } from 'react-icons/hi'
import { MdOutlineDisabledVisible } from 'react-icons/md'

const ImpulseController = () => {
    return (
        <Card
        >
            <HContainer justifyContent={AlignmentOptions.spaceBetween}>
                <HContainer>
                    <MdOutlineDisabledVisible />
                    <h1> Impulse Control</h1>
                </HContainer>
                <HiDotsVertical style={{ 'cursor': 'pointer' }} />
            </HContainer>
            <VContainer
            >
                <VContainer>
                    <input type="text" placeholder="Type the amount"></input>
                    <CardButton> preview consequence</CardButton>

                </VContainer>
            </VContainer>
        </Card>
    )
}

export default ImpulseController
