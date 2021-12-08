import { useEffect, useRef, useState } from "react"
import MoneyInput from "./ui/Controls/Inputs/MoneyInput/MoneyInput";
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

    const mainInputRef = useRef<HTMLInputElement>(null)


    const [mainBalance, setMainBalance] = useState('0')
    const [savingBalance, setSavingBalance] = useState('0')

    const format = (val: any) => `€` + val
    const parse = (val: any) => val.replace(/^\€/, "")


    const onDataChanged = () => {
        // get main balance
        const m = parse(mainBalance)
        const s = parse(savingBalance)
        _handleChangeCallback!([
            {
                accountType: AccountType.main,
                balance: parseFloat(m),
                active: true
            },
            {
                accountType: AccountType.saving,
                balance: parseFloat(s),
                active: true
            }
        ])
    }

    const onMainChanged = (_newMain: string) => {
        regExValidator(_newMain)
        setMainBalance(_newMain)
    }


    const onSavingChanged = (_newSaving: string) => {
        setSavingBalance(_newSaving)
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
                    <MoneyInput/>
                    <input
                        ref={mainInputRef}
                        onChange={(valueString) => onMainChanged(parse(valueString))}
                        value={format(mainBalance)}
                    />

                </VContainer>
                <VContainer>
                    <h6>
                        Saving Account
                    </h6>
                    <input type="number"
                        onChange={(valueString) => onSavingChanged(parse(valueString))}
                        value={format(savingBalance)}
                    />
                </VContainer>
            </VContainer>
        </>
    )
}

export default AccountsCreator