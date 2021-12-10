import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { AlignmentOptions } from 'components/ui/Layout'
import Card from 'components/ui/Layout/Card/Card'
import HContainer from 'components/ui/Layout/HContainer'
import VContainer from 'components/ui/Layout/VContainer'
import { HiDotsVertical } from 'react-icons/hi'
import { MdOutlineDisabledVisible } from 'react-icons/md'
import Text from 'components/ui/typography/Text'
import { useState } from 'react'

const ImpulseController = () => {
   
    return (
        <Card
        >
            <HContainer justifyContent={AlignmentOptions.spaceBetween}>
            <Text> Impulse Control</Text>
                <HiDotsVertical style={{ 'cursor': 'pointer' }} />
            </HContainer>
            {/* <MoneyInput></MoneyInput> */}
            {/* <VContainer>
                <VContainer>
                    <InputTextForm
                    _onChangeCallback={()=>{}}
                    _label={"How much you want to spend?"}/>
                    <CardButton> preview consequence</CardButton>
                </VContainer>
            </VContainer> */}
        </Card>
    )
}



export default ImpulseController



/** Leftovers */

 // const [showImpulseController, setshowImpulseController] = useState(false)
    // const [weeklyIC, setWeeklyIC] = useState(0)
    // const [dailyIC, setDailyIC] = useState(0)
    // const caluclateConsequenceIC = () => {

       

    //     const desireRef = useRef<HTMLInputElement>(null)

    //     const desire = parseFloat(desireRef.current!.value)

    //     get netto Balance 
    //     const netto = getNettoBalance(userInfo?.accounts[0].balance!, getSumUnpaidBills(userInfo?.bills!))
    //     get how many days left till next salary 
    //     let daysLeft = countDaysUntillNextSalary(userInfo?.salary.dayOfMonth!)
    //     const res = netto - desire
    //     setWeeklyIC(calculateActualWeeklyBudget(res, daysLeft))
    //     setDailyIC(calculateDailyBudget(res, daysLeft))

    // }