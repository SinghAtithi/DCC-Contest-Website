const calculateCurrDays = () => 
{
    const today = new Date(); // Get the current date
    const startDate = new Date("2023-10-18"); // Start date for the challenge
    const curDay = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24)); // Calculate the difference in days
    return curDay;
}
module.exports = calculateCurrDays;