import { Bill } from "react-app-env";
import moment from 'moment'


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
    },
    getNettoBalance2: (moneyAvailable: number, bills: Bill[], duration:moment.Duration) => {
        bills.forEach(b => {
            
        });
    },

    sumBills :async ()=>{
        // get sum bills from be
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
    },



}

export const countDaysDifference = (beginDate: moment.Moment, endDate: moment.Moment
) => {
    const duration = moment.duration(endDate.diff(beginDate))
    console.info("Diff", duration.asDays())
    return duration.asDays() 
}
//Duplicate frm be 
export const shouldIRefresh = (xHours: number, _nowTime: string, _lastUpdateTime: string) => {

    //FormatDate 
    const formattedLastUpdt = moment(_lastUpdateTime)
    const formattedNowTime = moment(_nowTime)
    console.log("formattedLastUpdt IS ", formattedLastUpdt)
    console.log("formattedNowTime IS ", formattedNowTime)
    const duration = moment.duration(formattedNowTime.diff(formattedLastUpdt))
    const hours = duration.asHours()
    const timePassed = parseFloat(hours.toFixed(2))
    console.log("HOURS PASSED SINCE LAST UPDATE ::", timePassed)
    if (xHours < timePassed) { return true }
    return false

}



