document.addEventListener("DOMContentLoaded", () => {
    const taxForm = document.getElementById("tax-form");
    const totalIncomeDisplay = document.getElementById("total-income");
    const taxRateDisplay = document.getElementById("tax-rate");
    const taxToPayDisplay = document.getElementById("tax-to-pay");
    const amountLeftDisplay = document.getElementById("amount-left");

    taxForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const income = parseFloat(document.getElementById("income").value);
        const taxDetails = calculateTaxes(income);
        totalIncomeDisplay.textContent = income.toFixed(2);
        taxRateDisplay.textContent = `${taxDetails.taxRate}%`;
        taxToPayDisplay.textContent = taxDetails.taxToPay.toFixed(2);
        amountLeftDisplay.textContent = (income - taxDetails.taxToPay).toFixed(2);
    });

    function calculateTaxes(income) {
        let taxRate = 0;
        if (income > 1000000) {
            taxRate = 20;
        } else if (income > 700000) {
            taxRate = 15;
        } else if (income > 500000) {
            taxRate = 10;
        } else if (income > 300000) {
            taxRate = 5;
        }
        const taxToPay = (income * taxRate) / 100;
        return { taxRate, taxToPay };
    }
});
