/// <reference types="react-scripts" />


export interface Bill {
    id: string,
    sum: number,
    text: string,
    username: string,
    paid: boolean,
    when: number,
}

export interface TimespanPlan {
    startDate: Date,
    endDate: Date,
    moneyToBeSaved: number,
    foodBudget: number,
    othersBudget: number,
    opsRef: Array<string> | undefined,
    userId: string,
}

export interface IGoal {
    text: string,
    cost: number,
    deadline?: Date
}


export interface BillResponse {
    bills: any[],
    sum: number
}

export interface InfosOfUser {
    username: string,
    salary: {
        amount: number,
        dayOfMonth: number
    },
    bills: Array<{
        billName: string,
        username: string
        paid: boolean,
        cost: number,
        when: number,
    }>,
    accounts: Array<{
        accountType: AccountType,
        balance: number
        active: boolean
    }>,
    weeklybudget: {
        limit: number,
        spent: number
    }

}


export interface IUserInfoResponse {
    username: string,
    grossBalance: number,
    daySalary: number,
    foodBudget: number,
    miscBudget: number
}

export interface BudgetConfigUI{
    food: number,
    others: number
}