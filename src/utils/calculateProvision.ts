export const calculateProvision = (total: number, percent = 0.1) => {
    const provision = total * percent
    if(provision > 10)
        return 10
    else return provision
}