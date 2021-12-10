import { useEffect, useRef, useState } from "react"
import VContainer from "./ui/Layout/VContainer"


export enum AccountType {
    main = "main",
    saving = "saving"
}

export interface AccountsInfo {
    accountType: AccountType,
    balance: number,
    active: boolean
}
interface AccountsProps {
    _handleChangeCallback?: (_a: AccountsInfo[]) => void
}

const AccountsCreator: React.FC<AccountsProps> = ({ _handleChangeCallback }) => {
    //RegEx  only numbers and a point
    const regExValidator = (_Candidate: string) => {
        const reg = new RegExp('^\d+(\.\d+)*$');
        return reg.test(_Candidate)
    }

    const [mainBalance, setMainBalance] = useState<null | number>(null)
    const [savingBalance, setSavingBalance] = useState<null | number>(null)



    const onDataChanged = () => {
        if (mainBalance && savingBalance) {
            _handleChangeCallback!([
                {
                    accountType: AccountType.main,
                    balance: mainBalance,
                    active: true
                },
                {
                    accountType: AccountType.saving,
                    balance: savingBalance,
                    active: true
                }
            ])
        }
    }

    const onMainChanged = (_newMain: number) => {
        setMainBalance(_newMain)
    }

    
    const onSavingChanged = (_newMain: number) => {
        setSavingBalance(_newMain)
    }

    useEffect(() => {
        if (_handleChangeCallback)
            onDataChanged()
    }, [mainBalance, savingBalance])
    return (
        <>
            <VContainer>
                <VContainer>
                    <h6>
                        Main Account
                    </h6>
                    {/* <MoneyInput/> */}
                    <input
                        type="number"
                        onChange={(valueString: React.ChangeEvent<HTMLInputElement>) => onMainChanged(parseFloat(valueString.target.value))}
                        value={mainBalance ? mainBalance : ''}
                    />

                </VContainer>
                <VContainer>
                    <h6>
                        Saving Account
                    </h6>
                    <input
                        type="number"
                        onChange={(valueString: React.ChangeEvent<HTMLInputElement>) => onSavingChanged(parseFloat(valueString.target.value))}
                        value={savingBalance ? savingBalance : ''}
                    />
                </VContainer>
            </VContainer>
        </>
    )
}

export default AccountsCreator


//backup


// const format = (val: any) => `€` + val
// const parse = (val: any) => val.replace(/^\€/, "")