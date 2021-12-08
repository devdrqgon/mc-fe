import { Bill } from "react-app-env";


export const BillsHelpers = {
    getSumUnpaidBills: (bills: Array<Bill>) => {
        let sum = 0
        bills.forEach(element => {
            if (element.paid === false) {
                sum = sum + element.cost
            }
        });
        return sum
    },
    getSumPaidills: (bills: Array<Bill>) => {
        let sum = 0
        bills.forEach(element => {
            if (element.paid === true) {
                sum = sum + element.cost
            }
        });
        return sum
    },
    getSumAllBills: (bills: Array<Bill>) => {
        let sum = 0
        bills.forEach(element => {
            sum = sum + element.cost
        })
        return sum
    }

}

export const MoneyHelpers = {
    calculateActualWeeklyBudget: (nettoBalance: number, daysLeft: number) => {
        return ((nettoBalance / daysLeft) * 7)
    },
    calculateDailyBudget: (nettoBalance: number, daysLeft: number) => {
        return ((nettoBalance / daysLeft))
    },
    getNettoBalance: (grossBalance: number, sumBills: number) => {
        return grossBalance - sumBills
    }
}

export const DateHelpers = {
    countDaysUntillNextSalary: (dayOfSalary: number) => {
        const today = new Date().getDate()
        if (today === dayOfSalary) { return 0 }
        if (today < dayOfSalary) {
            return (dayOfSalary - today)
        }
        else {
            //the remaining days of the current month + the days of the next month 
            //count days till end of month
            //get last day of the current month 
            const todayAgain = new Date();
            const lastDayOfMonth = new Date(todayAgain.getFullYear(), todayAgain.getMonth() + 1, 0).getDate()
            let daysleft = lastDayOfMonth - today
            daysleft = daysleft + dayOfSalary
            return daysleft
        }
    }
}




