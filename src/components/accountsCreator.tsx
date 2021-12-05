import { useEffect, useState } from "react"
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
                    <input type="number"
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