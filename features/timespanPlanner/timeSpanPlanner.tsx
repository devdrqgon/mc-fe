import React, { useState } from 'react'
import { Bill } from '../../../types';
import Preferences from './preferences';

export interface IcssProps {
    bgColor: string,
    txtColor: string
}

export const getSumUnpaidBills = (bills: Array<Bill>) => {
    let sum = 0
    bills.forEach(element => {
        if (element.paid === false) {
            sum = sum + element.sum
        }
    });
    return sum
}

export const getSumPaidills = (bills: Array<Bill>) => {
    let sum = 0
    bills.forEach(element => {
        if (element.paid === true) {
            sum = sum + element.sum
        }
    });
    return sum
}

export const TimespanPlanner = () => {
    const currentBalance = 2300
    const sumUnpaidills = 1500 
    const [amapChecked, setAMAPflag] = useState<boolean>(false) //amap: as much as possible
    const [minFoodBudget, setMinFoodBudget] = useState<undefined | number>(undefined)
    const [minOthersBudget, setMinOthersBudget] = useState<undefined | number>(undefined)
    const [savingBudget, setSavingBudget] = useState<number | undefined>(undefined)
    const [allFoodBudget, setAllFoodBudget] = useState<number | undefined>(undefined)
    const [allOthersBudget, setAllOthersBudget] = useState<number | undefined>(undefined)
    const [planReady, setPlanReady] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<undefined | string>(undefined)
    const outputcss = () => {
        const cssProp: React.CSSProperties = {
            color: 'rgb(240, 233, 223)',
            fontSize: '25px',
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderTop: '1px solid  rgb(224, 195, 157)',
            borderLeft: '1px solid  rgb(224, 195, 157)',
            borderRight: '1px solid  rgb(224, 195, 157)',
            borderRadius: '15px 50px 30px 50px'
        }
        return cssProp
    }
    const createPlan = () => {
        const AllFoodBudget = minFoodBudget! * getDaysLeftUntilSalary()
        setAllFoodBudget(AllFoodBudget)
        const AllOthersBudget = minOthersBudget! *1
        setAllOthersBudget(AllOthersBudget)
        const SavingBudget = currentBalance! - sumUnpaidills - AllFoodBudget - minOthersBudget!
        setSavingBudget(SavingBudget!)
        setPlanReady(true)
    }
    const getDaysLeftUntilSalary = () => {
        //! temp

        return 26
    }
    return (
        <>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '5px 5px',
                    marginBottom: '5px'
                }}>
                <div
                    style={{
                        backgroundColor: 'rgb(184, 231, 108)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}
                >
                    <div>
                        Current total gross Balance
                    </div>
                    <div>
                        {currentBalance}€
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: 'rgb(184, 231, 108)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}
                >
                    <div>
                        Current total  nett Balance
                    </div>
                    <div>
                        {(currentBalance! - sumUnpaidills).toFixed(2)}€
                    </div>
                </div>
                <div
                    style={{
                        backgroundColor: 'rgb(184, 231, 108)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}
                >
                    <div>
                        Number of days until you receieve 2600€
                    </div>
                    <div>
                        26
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '5px 5px',
                }}>
                <Preferences
                    props={{
                        amapChecked: amapChecked,
                        setAMAPflag: setAMAPflag,
                        setMinFoodBudget: setMinFoodBudget,
                        setMinOthersBudget: setMinOthersBudget
                    }}
                />
                {planReady ?
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '5px 5px',
                            marginBottom: '5px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#6fd8c5'
                            }}
                        >
                            Allfoodbudget: {allFoodBudget!.toFixed(2)}€
                        </div>
                        <div
                            style={{
                                backgroundColor: '#69e330'
                            }}
                        >
                            otherbudget: {allOthersBudget!.toFixed(2)}€
                        </div>
                        <div
                            style={{
                                backgroundColor: '#9046f0'
                            }}
                        >
                            savingBudget: {savingBudget!.toFixed(2)}€
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>
            <div
                style={{
                    display: 'grid',
                    backgroundColor: 'rgb(253, 205, 143)'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <button
                        onClick={() => { createPlan() }}
                    >
                        Create Plan!
                    </button>
                </div>
            </div>

        </>
    )
}


