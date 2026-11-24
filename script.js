
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const categoryInput = document.getElementById('expense-category');
const addBtn = document.getElementById('add-btn');
const filterCategory = document.getElementById('filter-category');
const expenseList = document.getElementById('expense-list');
const totalAmountSpan = document.getElementById('total-amount');


let expenses = [];


addBtn.addEventListener('click', function() {
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    
    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and positive amount!");
        return;
    }

    
    const newExpense = {
        id: Date.now(), 
        name: name,
        amount: amount,
        category: category
    };

    expenses.push(newExpense);

    
    nameInput.value = "";
    amountInput.value = "";

    
    renderExpenses();
});


function renderExpenses() {
    expenseList.innerHTML = "";
    const selectedCategory = filterCategory.value;
    let total = 0;

    expenses.forEach(function(item) {
        
        if (selectedCategory === "All" || item.category === selectedCategory) {
            total += item.amount;

            
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${item.name}</strong> (${item.category}) - ₹${item.amount}
                </div>
                <button class="delete-btn" onclick="deleteExpense(${item.id})">Delete</button>
            `;
            expenseList.appendChild(li);
        }
    });

    
    totalAmountSpan.textContent = total;
}


function deleteExpense(id) {
    expenses = expenses.filter(function(item) {
        return item.id !== id;
    });
    renderExpenses();
}


filterCategory.addEventListener('change', renderExpenses);