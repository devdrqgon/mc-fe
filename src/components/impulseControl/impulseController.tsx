import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { AlignmentOptions } from 'components/ui/Layout'
import Card from 'components/ui/Layout/Card/Card'
import HContainer from 'components/ui/Layout/HContainer'
import VContainer from 'components/ui/Layout/VContainer'
import { HiDotsVertical } from 'react-icons/hi'
import { MdOutlineDisabledVisible } from 'react-icons/md'
import Text from 'components/ui/typography/Text'
import { useContext, useEffect, useRef, useState } from 'react'
import MoneyInput from 'components/ui/Controls/Inputs/MoneyInput'
import InputTextForm from 'components/ui/Controls/Inputs/InputTextForm'
import HSpacer from 'components/ui/Layout/HSpacer'
import { DashboardContext } from 'contextProviders/dashboard.provider'

const ImpulseController = () => {
    const ref = useRef<HTMLInputElement>(null)

    const { userInfo } = useContext(DashboardContext);
    const [weekly, setWeekly] =  useState<null|number>(null)

    const [usrInput, setUsrInput] = useState('')

    const [daily, setDaily] = useState<null|number>(null)

    const hanleValChange = () =>{
        setUsrInput(ref.current!.value)
    }

    const refreshui= ()=>{
        const newNetto = userInfo!.balance.netto-parseFloat(usrInput) 
        const newDaily = newNetto/userInfo!.nextIncome.daysleft
        const newWeekly = newDaily * 7
        setDaily(newDaily)
        setWeekly(newWeekly)
    }
    useEffect(refreshui,[usrInput])
    return (
        <Card
        >
            <HContainer justifyContent={AlignmentOptions.spaceBetween}>
            <Text> Impulse Control</Text>
                <HiDotsVertical style={{ 'cursor': 'pointer' }} />
            </HContainer>
             <input type="text" ref={ref} onChange={hanleValChange} /> 
             <VContainer>
             <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        daily
                    </Text>
                    <Text>
                        €{daily?.toFixed(2)}
                    </Text>
                </HContainer>
                <HSpacer _space={6} />
                <HContainer
                    justifyContent={AlignmentOptions.spaceBetween}>
                    <Text>
                        weekly
                    </Text>
                    <Text>
                        €{weekly?.toFixed(2)}
                    </Text>
                </HContainer>
            </VContainer> 
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