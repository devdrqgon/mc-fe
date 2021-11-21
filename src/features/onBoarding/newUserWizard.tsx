import { useDisclosure } from "@chakra-ui/hooks"
import MCModal from "components/modal"
import React, { useEffect, useState } from "react"
import Accounts from "./accounts"
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import SalaryInfo from "./SalaryInfo";
import BudgetConfig from "./budgetConfig";
import { Box, VStack } from "@chakra-ui/layout";
import { Modal } from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";


const steps: Array<{
    label: string,
    comp: JSX.Element
}> = [
        { label: 'Accounts', comp: < Accounts /> },
        { label: 'Salary', comp: < SalaryInfo /> },
        { label: 'Budget', comp: < BudgetConfig /> },
    ]

interface NewUserWizardProps {
    _token: string,
    _username: string
}


const NewUserWizard: React.FC<NewUserWizardProps> = (props) => {
    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
        initialStep: 0,
    })
    const [afterSubmitModalBody, setAfterSubmitModalBody] = useState<React.ReactNode>(
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
    const [submitClicked, setsubmitClicked] = useState(false)
    const { isOpen, onClose, onOpen } = useDisclosure({ id: 'mcModal' })
    const submitInitUserInfo = () => {
        setsubmitClicked(true)
        setTimeout(() => {
            callBE()
        }, 1000)

    }
    const generateWizardBody = () => {
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

    const callBE = async () => {
        try {
            const response: AxiosResponse<any, any> = await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/info/',
                headers: {
                    Authorization: props._token
                },
                data: {
                    username: props._username,
                    salary: {
                        amount: 200,
                        dayOfMonth: 4
                    },
                    bills: [],
                    accounts: []
                },
            })
            if (response.status === 201) {
                setAfterSubmitModalBody(
                    <Box>
                        Success!
                    </Box>
                )
            }
            else {
                setAfterSubmitModalBody(
                    <Box>
                        Failure!
                    </Box>
                )
            }
        } catch (error) {
            setAfterSubmitModalBody(
                <Box>
                    Failure!
                </Box>
            )
        }
    }



    useEffect(() => {
        onOpen()
    }, [afterSubmitModalBody])
    return (
        <>
            <MCModal
                _title={"Let's get you quickly started, Ahmed!"}
                _body={submitClicked === false ? generateWizardBody() : afterSubmitModalBody}
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