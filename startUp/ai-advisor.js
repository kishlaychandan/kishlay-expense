document.addEventListener("DOMContentLoaded", () => {
    const advisorOutput = document.getElementById("advisor-output");

    // Mock function to simulate AI financial advice
    function getFinancialAdvice(expenses) {
        const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const averageSpent = (totalSpent / expenses.length).toFixed(2);
        let advice = "Your spending looks balanced. 😊";
        if (averageSpent > 100) {
            advice = "Consider reducing your average spending. ☹️";
        }
        return advice;
    }

    setInterval(() => {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const advice = getFinancialAdvice(expenses);
        advisorOutput.textContent = advice;
    }, 5000);  // Update advice every 5 seconds
});
