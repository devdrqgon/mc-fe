
import CardButton from 'components/ui/Controls/Buttons/CardButtons'
import { AlignmentOptions } from 'components/ui/Layout'
import Card from 'components/ui/Layout/Card/Card'
import HContainer from 'components/ui/Layout/HContainer'
import VContainer from 'components/ui/Layout/VContainer'
import Text from 'components/ui/typography/Text'
import React, { useEffect, useState } from 'react'

interface SavingPlanCreatorProps {
    _userMinBudget: number,
    _currentDailyBudget: number,
    _daysTillNxtSalary: number
}
const SavingPlanCreator: React.FC<SavingPlanCreatorProps> = (props) => {
    const getPotentialSavedMoneyTillNextIncome = () => {

        return ((props._currentDailyBudget - props._userMinBudget) * props._daysTillNxtSalary)
    }


    return (
        <VContainer
        >
            <Text>You told us that you your minimum budget per day is  €{props._userMinBudget.toFixed(2)}.....
                If you reduce your daily budget to match your minimum  budget</Text> <br />
            <ul style={{ marginLeft: "25px" }}>
                <li> You would save  €{getPotentialSavedMoneyTillNextIncome().toFixed(2)}
                    until next income, which comes in {props._daysTillNxtSalary} days</li>
                <li>
                    Your whole new spending budget would be
                    €{(props._userMinBudget * props._daysTillNxtSalary).toFixed(2)},
                    before it was  €{(props._currentDailyBudget * props._daysTillNxtSalary).toFixed(2)}
                </li>
                <li>Your new weekly budget would be
                    €{(props._userMinBudget! * 7).toFixed(2)},
                    before it was €{(props._currentDailyBudget * 7).toFixed(2)}
                </li>
                <li>
                    Your new daily budget would be
                    €{(props._userMinBudget!).toFixed(2)},
                    before it was €{(props._currentDailyBudget).toFixed(2)}
                </li>
            </ul>
            <HContainer justifyContent={AlignmentOptions.center} alignItems={AlignmentOptions.center}>
                <CardButton> Set Saving Budget</CardButton>
            </HContainer>
        </VContainer>
    )
}

export default SavingPlanCreator
