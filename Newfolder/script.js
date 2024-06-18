document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const expenseChartCtx = document.getElementById("expense-chart").getContext("2d");
    const deleteAllButton = document.getElementById("delete-all");
    const modeToggleButton = document.getElementById("mode-toggle");
    const hamburgerMenuButton = document.getElementById("hamburger-menu");
    const sidebar = document.getElementById("sidebar");
    const body = document.body;

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let expenseChart;

    expenseForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const category = document.getElementById("category").value;
        const expense = { id: Date.now(), description, amount, category };
        expenses.push(expense);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateExpenseList();
        updateExpenseChart();
        expenseForm.reset();
    });

    expenseList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const id = event.target.parentElement.dataset.id;
            expenses = expenses.filter(exp => exp.id !== parseInt(id));
            localStorage.setItem("expenses", JSON.stringify(expenses));
            updateExpenseList();
            updateExpenseChart();
        } else if (event.target.classList.contains("edit-btn")) {
            const id = event.target.parentElement.dataset.id;
            const expense = expenses.find(exp => exp.id === parseInt(id));
            document.getElementById("description").value = expense.description;
            document.getElementById("amount").value = expense.amount;
            document.getElementById("category").value = expense.category;
            expenses = expenses.filter(exp => exp.id !== parseInt(id));
            localStorage.setItem("expenses", JSON.stringify(expenses));
            updateExpenseList();
            updateExpenseChart();
        }
    });

    deleteAllButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete all expenses?")) {
            expenses = [];
            localStorage.removeItem("expenses");
            updateExpenseList();
            updateExpenseChart();
        }
    });

    modeToggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // hamburgerMenuButton.addEventListener("click", () => {
    //     sidebar.classList.toggle("show");
    //     body.classList.toggle("sidebar-open");
    // });

    function updateExpenseList() {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const li = document.createElement("li");
            li.dataset.id = expense.id;
            li.innerHTML = `<span>${expense.description}: $${expense.amount} [${expense.category}]</span>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>`;
            expenseList.appendChild(li);
        });
    }

    function updateExpenseChart() {
        const categories = [...new Set(expenses.map(exp => exp.category))];
        const data = categories.map(category => {
            return expenses
                .filter(exp => exp.category === category)
                .reduce((total, exp) => total + exp.amount, 0);
        });

        if (expenseChart) {
            expenseChart.destroy();
        }

        expenseChart = new Chart(expenseChartCtx, {
            type: 'pie',
            data: {
                labels: categories,
                datasets: [{
                    data: data,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    updateExpenseList();
    updateExpenseChart();
});
function logout() {
    sessionStorage.removeItem('loggedIn');
    window.location.href = '../index.html';
} 

function checkLogin() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (!loggedIn) {
        window.location.href = '../index.html';
    }
}