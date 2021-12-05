
import { VContainer } from "components/ui/Layout/VContainer"
import { useEffect, useState } from "react"
import { BudgetConfigUI } from "react-app-env"

interface BudgetConfigProps {
    _handleChange?: (c: BudgetConfigUI) => void
}
const BudgetConfigCreator: React.FC<BudgetConfigProps> = ({ _handleChange }) => {

    const format = (val: any) => `€` + val
    const parse = (val: any) => val.replace(/^\€/, "")

    const [food, setFood] = useState("0")
    const [others, setOthers] = useState("0")
    const onDataChanged = () => {
        // get main balance
        const f = parse(food)
        const o = parse(others)

        _handleChange!({
            food: f,
            others: o
        })
    }

    useEffect(() => {
        if (_handleChange)
            onDataChanged()
    }, [food, others])
    return (
        <>
            <VContainer>
                <VContainer>
                    <h6>
                        Food
                    </h6>
                    <input type="number"
                        onChange={(valueString) => setFood(parse(valueString))}

                        value={format(food)}
                    />

                </VContainer>
                <VContainer>
                    <h6>
                       Others
                    </h6>
                    <input type="number"
                        onChange={(valueString) => setOthers(parse(valueString))}

                        value={format(others)}
                    />
                </VContainer>
            </VContainer>
        </>
    )
}

export default BudgetConfigCreator