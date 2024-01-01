export const generateYears = () => {
    const currentYear = new Date().getFullYear()
    const arr = []
    for (let i = currentYear - 100; i <= currentYear; i++) {
        arr.push({ value: String(i), label: String(i), isAvailable: true })
    }
    return arr.reverse()
}
