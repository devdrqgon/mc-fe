import { Button } from '@chakra-ui/button'
import { Box, VContainer, Divider } from '@chakra-ui/layout'
import { Center, Flex } from '@chakra-ui/react'
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
        <Box
            p={1}
            w={'full'}
            boxShadow="base"
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <Box
            >
                <h1>You told us that you your minimum budget per day is  €{props._userMinBudget.toFixed(2)}.....
                    If you reduce your daily budget to match your minimum  budget</h1> <br />
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
                <Center mt={4}>
                    <Button> Set Saving Budget</Button>
                </Center>
            </Box>
        </Box>
    )
}

export default SavingPlanCreator
