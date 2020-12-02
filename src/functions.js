export const dateFormat = (date) => {
    const d = new Date(date)
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
    return d.toLocaleDateString('en-GB', options)
}