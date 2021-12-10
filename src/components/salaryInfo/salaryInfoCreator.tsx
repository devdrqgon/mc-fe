import VContainer from "components/ui/Layout/VContainer"
import {  useEffect, useState } from "react"
import { SalaryInfo } from "react-app-env"

interface SalaryInfoProps {
    _handleChange?: (s: SalaryInfo) => void
}
const SalaryInfoCreator: React.FC<SalaryInfoProps> = ({ _handleChange }) => {
    

    const [amountSalary, setAmountSalary] = useState<null | number>(null)
    const [dayOfMonthOfSalary, setDayOfMonthOfSalary] = useState<null | number>(null)

   
    const onDataChanged = () => {
        if (amountSalary && dayOfMonthOfSalary) {
            _handleChange!({
                amount: amountSalary,
                dayOfMonth: dayOfMonthOfSalary
            })
        }
    }

    const onAmountSalaryChanged = (_newMain: number) => {
        setAmountSalary(_newMain)
    }

    
    const onDayOfMonthOfSalaryChanged = (_newMain: number) => {
        setDayOfMonthOfSalary(_newMain)
    }

    useEffect(() => {
        if (_handleChange)
            onDataChanged()
    }, [amountSalary, dayOfMonthOfSalary])
    return (
        <>
            <VContainer>
                <VContainer>
                    <h6>
                        Amount
                    </h6>
                    <input
                        type="number"
                        onChange={(valueString: React.ChangeEvent<HTMLInputElement>) => onAmountSalaryChanged(parseFloat(valueString.target.value))}
                        value={amountSalary ? amountSalary : ''}
                    />

                </VContainer>
                <VContainer>
                    <h6>
                        Day
                    </h6>
                    <input
                        type="number"
                        onChange={(valueString: React.ChangeEvent<HTMLInputElement>) => onDayOfMonthOfSalaryChanged(parseFloat(valueString.target.value))}
                        value={dayOfMonthOfSalary ? dayOfMonthOfSalary : ''}
                    />
                </VContainer>
            </VContainer>
        </>
    )
}

export default SalaryInfoCreator