document.addEventListener("DOMContentLoaded", () => {
    const taxForm = document.getElementById("tax-form");
    const taxOutput = document.getElementById("tax-output");

    taxForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const income = parseFloat(document.getElementById("income").value);
        const expenses = parseFloat(document.getElementById("expenses").value);
        const estimatedTaxes = calculateTaxes(income, expenses);
        taxOutput.textContent = `Estimated Taxes: $${estimatedTaxes}`;
    });

    function calculateTaxes(income, expenses) {
        const taxableIncome = income - expenses;
        const taxRate = 0.25;  // Simplified tax rate
        return (taxableIncome * taxRate).toFixed(2);
    }
});
