import { Bill } from "react-app-env";

export const getSumUnpaidBills = (bills: Array<Bill>) => {
    let sum = 0
    bills.forEach(element => {
        if (element.paid === false) {
            sum = sum + element.sum
        }
    });
    return sum
}

export const getSumPaidills = (bills: Array<Bill>) => {
    let sum = 0
    bills.forEach(element => {
        if (element.paid === true) {
            sum = sum + element.sum
        }
    });
    return sum
}