import { Button } from '@chakra-ui/button'
import { Box, VStack, Divider } from '@chakra-ui/layout'
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
            p={6}
            m={3}
            w={'full'}
            boxShadow="base"
            rounded={'lg'}
            pos={'relative'}
            zIndex={1}>
            <VStack
                alignItems="flex-start">
                <Divider mt={2} orientation={'horizontal'}></Divider>
                <VStack
                    pr={3}
                    pl={3}
                    pb={1}
                    rounded={'lg'}
                    w={"full"}
                    alignItems="flex-start">
                    <Box
                        boxShadow="base"
                    >
                        <h1>You told us that you your minimum budget per day is  €{props._userMinBudget.toFixed(2)} </h1> <br />
                        <h1>Your current daily budget is €{props._currentDailyBudget.toFixed(2)} </h1> <br />
                        <h1>Your current weekly budget is €{(props._currentDailyBudget * 7).toFixed(2)} </h1> <br />
                    </Box>
                    <Box
                        boxShadow="base"
                    >
                        <h1>If you reduce your daily budget to match your minimum  budget, you can save €{getPotentialSavedMoneyTillNextIncome().toFixed(2)}
                            till nxt salary, which comes in {props._daysTillNxtSalary} days</h1> <br />
                        <h1>Your new daily budget would be  €{props._userMinBudget?.toFixed(2)} </h1> <br />
                        <h1>Your new weekly budget would be  €{(props._userMinBudget! * 7).toFixed(2)} </h1> <br />

                        <Button> Set Saving Budget</Button>
                    </Box>



                </VStack>
            </VStack>
        </Box>
    )
}

export default SavingPlanCreator
