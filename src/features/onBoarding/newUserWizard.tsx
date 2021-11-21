import { useDisclosure } from "@chakra-ui/hooks"
import MCModal from "components/modal"
import { useEffect } from "react"
import Accounts from "./accounts"
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import SalaryInfo from "./SalaryInfo";
import BudgetConfig from "./budgetConfig";

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
    const { isOpen, onClose, onOpen } = useDisclosure({ id: 'mcModal' })
    const generateBody = () => {
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
                />
        </>
    )
}

export default NewUserWizard