document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const expenseChartCtx = document.getElementById("expense-chart").getContext("2d");
    const deleteAllButton = document.getElementById("delete-all");
    const modeToggleButton = document.getElementById("mode-toggle");
    const hamburgerMenuButton = document.getElementById("hamburger-menu");
    const sidebar = document.getElementById("sidebar");
    const body = document.body;

    let expenseStartUp = JSON.parse(localStorage.getItem("expenseStartUp")) || [];
    let expenseChart;

    expenseForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const description = document.getElementById("description").value;
        const amount = parseFloat(document.getElementById("amount").value);
        const category = document.getElementById("category").value;
        const expense = { id: Date.now(), description, amount, category };
        expenseStartUp.push(expense);
        localStorage.setItem("expenseStartUp", JSON.stringify(expenseStartUp));
        updateExpenseList();
        updateExpenseChart();
        expenseForm.reset();
    });

    expenseList.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-btn")) {
            const id = event.target.parentElement.dataset.id;
            expenseStartUp = expenseStartUp.filter(exp => exp.id !== parseInt(id));
            localStorage.setItem("expenseStartUp", JSON.stringify(expenseStartUp));
            updateExpenseList();
            updateExpenseChart();
        } else if (event.target.classList.contains("edit-btn")) {
            const id = event.target.parentElement.dataset.id;
            const expense = expenseStartUp.find(exp => exp.id === parseInt(id));
            document.getElementById("description").value = expense.description;
            document.getElementById("amount").value = expense.amount;
            document.getElementById("category").value = expense.category;
            expenseStartUp = expenseStartUp.filter(exp => exp.id !== parseInt(id));
            localStorage.setItem("expenseStartUp", JSON.stringify(expenseStartUp));
            updateExpenseList();
            updateExpenseChart();
        }
    });

    deleteAllButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to delete all expenseStartUp?")) {
            expenseStartUp = [];
            localStorage.removeItem("expenseStartUp");
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
        expenseStartUp.forEach(expense => {
            const li = document.createElement("li");
            li.dataset.id = expense.id;
            li.innerHTML = `<span>${expense.description}: ₹${expense.amount} [${expense.category}]</span>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>`;
            expenseList.appendChild(li);
        });
    }

    function updateExpenseChart() {
        const categories = [...new Set(expenseStartUp.map(exp => exp.category))];
        const data = categories.map(category => {
            return expenseStartUp
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