import { UserInfoResponse } from "react-app-env";

export interface IDashboardContext {
    userInfo: UserInfoResponse | null,
    netto: number | null,
    BudgetStateUI: BudgetStateUI | null,
    SalaryInfoStateUI: SalaryInfoStateUI | null,
    SavingPlanStateUI: SavingPlanStateUI | null
}



export interface BudgetStateUI {
    weekly: number,
    daily: number
}

export interface SalaryInfoStateUI {
    amount: number,
    daysLeft: number
}

export interface SavingPlanStateUI {
    userMinBudget: number,
    currentDailyBUdget: number,
    daysTillNxtSalary: number
}
