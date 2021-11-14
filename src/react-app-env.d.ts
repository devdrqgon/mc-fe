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

export interface IGoal{
    text: string,
    cost: number,
    deadline?: Date
}


export interface BillResponse {
    bills: any[],
    sum: number
}