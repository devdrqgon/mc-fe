import { NewBill, UserInfoResultDoc } from "features/auth/SignInCard";
import { Bill, UserInfoResponse } from "react-app-env";

export interface IDashboardContext {
    userInfo: UserInfoResultDoc | null,
    netto: number | null,
    BudgetStateUI: BudgetStateUI | null,
    SalaryInfoStateUI: SalaryInfoStateUI | null,
    SavingPlanStateUI: SavingPlanStateUI | null,
    BillsUI: {
        bills: NewBill[];
        paypalBills: NewBill[];
        manualBills: NewBill[];
    } | null,
    refreshUserInfo: () => void
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
