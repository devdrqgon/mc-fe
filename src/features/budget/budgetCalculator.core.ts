const getRestMoney = (gross: number, sumBills: number, food: number, misc: number) => {
        
   

    return gross - sumBills - ( (food *4)  + (misc * 4)) 

}


const getWeeklyBudget = ( food: number, misc: number) =>{
    return food + misc
}


export default{
    getRestMoney,
    getWeeklyBudget
}