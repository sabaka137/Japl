export const generateYears = () => {
    //fix-move to utils
    let currentYear = new Date().getFullYear()
    let arr = []
    for (let i = currentYear - 100; i <= currentYear; i++) {
        arr.push({ value: String(i), label: String(i),isAvailable:true })
    }
    return arr.reverse()
}
