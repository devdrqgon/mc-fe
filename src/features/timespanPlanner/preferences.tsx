import React, { ChangeEvent } from 'react'

interface PreferencesProps {
   props: PreferencesProp
}
export interface  PreferencesProp{
    setMinFoodBudget: React.Dispatch<React.SetStateAction<number | undefined>>
    setMinOthersBudget: React.Dispatch<React.SetStateAction<number | undefined>>
    setAMAPflag: React.Dispatch<React.SetStateAction<boolean>>
    amapChecked: boolean
}
const Preferences: React.FC<PreferencesProps> = ({props}) => {
    //! USE FORMIK https://formik.org/docs/overview
    return (
        <div
            style={{
                backgroundColor: 'rgb(115, 202, 115)',
              
            }}
        >
            <div>
                Preferences
            </div>
            <div>
                <div>
                    minimum budget for food per day
                </div>
                <div>
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => { props.setMinFoodBudget(e.target.value as unknown as number) }} type={"number"}></input>
                </div>
            </div>
            <div>
                <div>
                    minimum budget for other stuff during the whole timespan
                </div>
                <div>
                    <input onChange={(e: ChangeEvent<HTMLInputElement>) => { props.setMinOthersBudget(e.target.value as unknown as number) }} type={"number"}></input>
                </div>
            </div>
            <div>
                <div>
                    How much you want to save?
                </div>
                <div
                    style={{
                        display: 'flex'
                    }}
                >
                    <input
                    disabled={props.amapChecked}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { props.setMinFoodBudget(e.target.value as unknown as number) }} type={"number"}></input>
                    <div>
                        <input type="checkbox" id="amap" name="amap"
                            onClick={() => props.setAMAPflag(!props.amapChecked)} checked={props.amapChecked}
                        />
                        <label htmlFor="amap">As much as possible!</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preferences

