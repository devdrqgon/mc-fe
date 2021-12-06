import HContainer from 'components/ui/Layout/HContainer'
import VContainer from 'components/ui/Layout/VContainer'
import React, { useEffect, useState } from 'react'
import Text from 'components/ui/typography/Text'
import { AlignmentOptions } from 'components/ui/Layout'
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
interface Props {
    _steps: Step[],
    _submitCallback(): void
}
interface Step {
    label: string,
    comp: JSX.Element
}
const Steps: React.FC<Props> = (props) => {
    const [steps, setSteps] = useState<Step[] | null>(null)
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const nextStep = () => {
        setActiveIndex(activeIndex + 1)
    }
    const prevStep = () => {
        setActiveIndex(activeIndex - 1)
    }
    useEffect(() => {
        setSteps(props._steps)
    }, [steps])

    if (steps === null) return null

    return (
        <VContainer>
            <HContainer>
                <Text>
                    {steps[activeIndex].label}
                </Text>
            </HContainer>
            <HContainer>
                {steps[activeIndex].comp}
            </HContainer>
            <HContainer
                justifyContent={AlignmentOptions.spaceBetween}
            >
                {activeIndex !== 0 ?
                    <CardButton
                        onClick={prevStep}
                    >
                        Prev
                    </CardButton>
                    :
                    <></>
                }
                {activeIndex !== steps.length -1 ?

                    <CardButton
                        onClick={nextStep}
                    >
                        nxt
                    </CardButton>
                    :
                    <CardButton
                        onClick={props._submitCallback}
                    >
                        submit
                    </CardButton>
                    
                }
            </HContainer>
        </VContainer >
    )
}

export default Steps
