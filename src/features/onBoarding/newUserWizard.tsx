import { useDisclosure } from "@chakra-ui/hooks"
import MCModal from "components/modal"
import { useEffect, useState } from "react"
import Accounts from "./accounts"
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import SalaryInfo from "./SalaryInfo";
import BudgetConfig from "./budgetConfig";
import { Box, VStack } from "@chakra-ui/layout";
import { Modal } from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/react";

const steps: Array<{
    label: string,
    comp: JSX.Element
}> = [
        { label: 'Accounts', comp: < Accounts /> },
        { label: 'Salary', comp: < SalaryInfo /> },
        { label: 'Budget', comp: < BudgetConfig /> },
    ]

const NewUserWizard = () => {
    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })

    const [submitClicked, setsubmitClicked] = useState(false)
    const { isOpen, onClose, onOpen } = useDisclosure({ id: 'mcModal' })
    const submitInitUserInfo = () => {
        setsubmitClicked(true)
       
    }
    const generateBody = () => {
        if (submitClicked) {
            return (
                <VStack>
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    />
                    <Box>
                        Saving your Data..
                    </Box>
                </VStack>
            )
        } else
            return (
                <Steps activeStep={activeStep}>
                    {steps.map(({ label, comp }) => (
                        <Step label={label} key={label}>
                            {comp}
                        </Step>
                    ))}
                </Steps>
            )
    }
    useEffect(() => {
        onOpen()
    }, [])
    return (
        <>
            <MCModal
                _title={"Let's get you quickly started, Ahmed!"}
                _body={generateBody()}
                _isOpen={isOpen}
                _onClose={onClose}
                _nextStep={nextStep}
                _disableCloseBtn={true}
                _backBtn={activeStep === 0 ? undefined : prevStep}
                _submitBtn={activeStep !== steps.length - 1 ? undefined : submitInitUserInfo}
                _hideFooter={submitClicked}
                _closeOnOverlayClick
            />
        </>
    )
}

export default NewUserWizard