import VContainer from "components/ui/Layout/VContainer"
import { useRef, useState } from "react"
import { SalaryInfo } from "react-app-env"

interface SalaryInfoProps {
    _handleChange?: (s: SalaryInfo) => void
}
const SalaryInfoCreator: React.FC<SalaryInfoProps> = ({ _handleChange }) => {
    //refs

    const format = (val: any) => `€` + val
    const parse = (val: any) => val.replace(/^\€/, "")

    const [amountSalary, setAmountSalary] = useState("0")
    const [dayOfMonthOfSalary, setDayOfMonthOfSalary] = useState("1")

    const onChangeAmount = (newAmount: string) => {
        if (_handleChange) {
            _handleChange({
                amount: parseFloat(parse(newAmount)),
                dayOfMonth: parseInt(dayOfMonthOfSalary)
            })
        }
        setAmountSalary(parse(newAmount))
    }
    const onChangeDay = (newDay: string) => {

        if (_handleChange) {
            _handleChange({
                amount: parseFloat(amountSalary),
                dayOfMonth: parseInt(newDay)
            })
        }
        setDayOfMonthOfSalary(newDay)
    }

    return (
        <>
            <VContainer>
                <VContainer>
                    <h6>
                        Amount
                    </h6>
                    <input type="number"
                        onChange={(valueString) => setAmountSalary(parse(valueString))}

                        value={format(amountSalary)}
                    />

                </VContainer>
                <VContainer>
                    <h6>
                        Day
                    </h6>
                    <input type="number"
                        onChange={(valueString) => setDayOfMonthOfSalary(parse(valueString))}

                        value={format(dayOfMonthOfSalary)}
                    />
                </VContainer>
            </VContainer>
        </>
    )
}

export default SalaryInfoCreator