const getRestMoney = (gross: number, sumBills: number, food: number, misc: number) => {



    return gross - sumBills - ((food * 4) + (misc * 4))

}


const getWeeklyBudget = (food: number, misc: number) => {
    return food + misc
}


export default {
    getRestMoney,
    getWeeklyBudget
}




/**
 *

// Dear User,

// after excluding  D, C and B from A
// You can save E by having a weekly budget of F


I wanna buy:
        * bed stuff which costs 500
        * Permis which costs 2000
        * Buffer Money 3000


 */