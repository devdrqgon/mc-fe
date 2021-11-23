import { ChangeEvent, useState } from "react"
import axios from "axios";
import logging from "config/logging";

interface CreateSavingPlanProps {
    setOpenSavingDialog: React.Dispatch<React.SetStateAction<boolean>>
}
const CreateSavingPlan: React.FC<CreateSavingPlanProps> = (props) => {

    const [savingGoal, setsavingGoal] = useState<number>()
    const [weeklyFoodBudget, setFoodBudget] = useState<number>()
    const [weeklyOthersBudget, setOthersBudget] = useState<number>()
    const [maxSavePerMonth, setMaxSavePerMonth] = useState<number>()
    const [duration, setduration] = useState<number>()

    const previewPlan = () => {
        /** Money left deducting food and others budget */
        const maxSavePerMonth = 850 - ((weeklyFoodBudget! * 4) + (weeklyOthersBudget! * 4))
        setMaxSavePerMonth(maxSavePerMonth)
        const duration = savingGoal! / maxSavePerMonth
        setduration(duration)
    }
    const savePlan = async () => {

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/plans',
                data: {
                    username: localStorage.getItem('username'),
                    savingGoal,
                    maxSavePerMonth,
                    duration
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (response.status === 201) {
                props.setOpenSavingDialog(false)
            } else {
                alert("not 201!")
            }
        } catch (error) {
            logging.error("SavePlan", (error as Error).message, error)
        }
    }
    return (
        <>
            I want to save <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setsavingGoal(e.target.value as unknown as number) }} />
            <br />
            My weekly budget for food per week is <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setFoodBudget(e.target.value as unknown as number) }} />
            <br />
            My  weekly budget for other stuff (like a night out, a trip.. ) per week is <input onChange={(e: ChangeEvent<HTMLInputElement>) => { setOthersBudget(e.target.value as unknown as number) }} />
            <br />
            <button onClick={previewPlan}> Preview plan!</button>
            {maxSavePerMonth ?
                <div>
                    You need to save {maxSavePerMonth?.toFixed(2)} for {duration?.toFixed(2)} months
                    <br />
                    <button onClick={savePlan}> Save plan</button>
                </div>
                :
                <></>
            }
        </>
    )
}

export default CreateSavingPlan