/// <reference types="react-scripts" />


export enum AccountType {
    main = "main",
    saving = "saving"
}

export interface UserInfoResponse{
    username: string,
    salary: SalaryInfo,
    bills: Array<Bill>,
    accounts: Array<AccountsInfo>,
    budget?: BudgetInfo
}

export interface SalaryInfo {
    amount: number,
    dayOfMonth: number,
}


export interface AccountsInfo {
    accountType: AccountType,
    balance: number,
    active: boolean,
}
export interface Bill {
    _id: string,
    billName: number,
    username: string,
    paid: boolean,
    cost: number,
    when: number,
}

export interface BudgetInfo{
    spent: number,
    limit: number,
} 

export interface IGoal {
    text: string,
    cost: number,
    deadline?: Date
}




export interface BudgetConfigUI {
    food: string,
    others: string
}

