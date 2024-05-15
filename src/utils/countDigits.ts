export const countDigits = (str: string) => {
    let digits = [0,1,2,3,4,5,6,7,8,9];
    let amount = 0;
    str
        .split("")
        .forEach((char) => 
            digits.includes(parseFloat(char))
                ? amount++
                : amount
        )
    return amount;
}