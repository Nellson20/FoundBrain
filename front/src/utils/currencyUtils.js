

export const convertCurrency=(amount,fromUSD,toUSD)=>{
    return amount*(toUSD/fromUSD)
}