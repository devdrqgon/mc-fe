
import { VContainer } from "components/ui/Layout/VContainer"
import { useEffect, useState } from "react"
import { BudgetConfigUI } from "react-app-env"

interface BudgetConfigProps {
    _handleChange?: (c: BudgetConfigUI) => void
}
const BudgetConfigCreator: React.FC<BudgetConfigProps> = ({ _handleChange }) => {


    const [food, setFood] = useState<null | number>(null)
    const [others, setOthers] = useState<null | number>(null)
    const onDataChanged = () => {
        if (food && others) {
            _handleChange!({
                food: food,
                others: others
            })
        }
    }

    

    const onFoodChanged = (_newFood: number) => {
        setFood(_newFood)
    }
    const onOthersChanged = (_newOthers: number) => {
        setOthers(_newOthers)
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
                    <input
                        type="number"
                        onChange={(valueString: React.ChangeEvent<HTMLInputElement>) => onFoodChanged(parseFloat(valueString.target.value))}
                        value={food ? food : ''}
                    />


                </VContainer>
                <VContainer>
                    <h6>
                        Others
                    </h6>
                    <input
                        type="number"
                        onChange={(valueString: React.ChangeEvent<HTMLInputElement>) => onOthersChanged(parseFloat(valueString.target.value))}
                        value={others ? others : ''}
                    />

                </VContainer>
            </VContainer>
        </>
    )
}

export default BudgetConfigCreator