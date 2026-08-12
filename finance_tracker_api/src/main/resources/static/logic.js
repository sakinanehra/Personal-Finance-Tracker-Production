let loginBtn = document.getElementById("loginBtn");
let loginPage = document.getElementById("loginPage");
let appPage = document.getElementById("appPage");
let logout = document.getElementById("logout");
let saveBtn = document.getElementById("saveuser");
let currentUser = localStorage.getItem("currentUser")|| "";
let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];

function userExists(userKey){
    return localStorage.getItem(userKey + "_transactions") !== null;
}

loginBtn.addEventListener("click", function(){
    let name = document.getElementById("loginName").value;
    let acc = document.getElementById("loginAcc").value;
    if(name ==="" || acc ===""){
        alert("Enter Details First")
        return; 
    }
    if(acc.length <4){
        alert("Account Number too short");
        return;
    }
    currentUser = name + "_" + acc;
    localStorage.setItem("currentUser", currentUser);  
     if(!userExists(currentUser)){
        localStorage.setItem(currentUser + "_transactions" , JSON.stringify([]));
        alert("new user created")
     }
       loginPage.style.display = "none";
       appPage.style.display = "block";
       let parts = currentUser.split("_");
       let accname = parts[0];
       let accno = parts[1];
       userNameText.textContent = "Welcome " +accname;
       accountNumberText.textContent = "Account : "+accno;

       deposittext.textContent = "total Deposit : 0";
       withdrawtext.textContent = "total Withdraw : 0" ;
    loaduserdata();
    })
     
    function saveData(){
    let currentUser = localStorage.getItem("currentUser");
    localStorage.setItem(currentUser + "_balance" , balance);
    localStorage.setItem(currentUser + "_history" , historyList.innerHTML);
    localStorage.setItem(currentUser + "_totaldeposit" , totaldeposit);
    localStorage.setItem(currentUser + "_totalwithdraw" , totalwithdraw);
    }
   
    function loaduserdata(){ 
     currentUser = localStorage.getItem("currentUser");
      if (!currentUser) return;
      let parts = currentUser.split("_");
      let name = parts[0];
      let acc = parts[1];
      userNameText.textContent = "Welcome " + name;
      accountNumberText.textContent = "Account num : " +acc
       loginPage.style.display="none";
        appPage.style.display ="block";
        
        let savedBalance = localStorage.getItem(currentUser + "_balance");
        balance = Number(savedBalance) || 0;
        balanceText.textContent= "balance :" + balance;
        let savedHistory = localStorage.getItem(currentUser +"_history");
        historyList.innerHTML =savedHistory ;
       let savedDeposit = localStorage.getItem(currentUser + "_totaldeposit");
       let savedWithdraw = localStorage.getItem(currentUser + "_totalwithdraw");
       totaldeposit = Number(savedDeposit)||0;
       totalwithdraw = Number(savedWithdraw)||0;
       deposittext.textContent = "Total Deposit :" +totaldeposit;
       withdrawtext.textContent = "Total Withdraw:" +totalwithdraw;
       
       calculateMonthlyExpense();
       calculateAll();
       renderHistory();
       calculateCategoryTotals();
        updateSummary();
        displayBudget();
        updateBudgetProgress();
     }
     
     window.addEventListener("load" , loaduserdata);
     
logout.addEventListener("click", function(){
   localStorage.removeItem("name");
   localStorage.removeItem("account"); 
   localStorage.removeItem("currentUser");
    loginPage.style.display = "block";
    appPage.style.display = "none";
    historyList.innerHTML = "";
    balanceText.textContent = "";
    deposittext.textContent = "";
    withdrawtext.textContent = "";
    userNameText.textContent = "";
    accountNumberText.textContent = "";
     setTimeout(() =>{
        alert("login session expired , login again");
        logout.click() ;
      } , 5 *60 * 1000);
})
 
let nameInput =document.getElementById("nameInput");
let accNum = document.getElementById("accNum");
let amountInput = document.getElementById("amount");
let depositBtn = document.getElementById("deposit");
let withdrawBtn = document.getElementById("withdraw");
let balanceText = document.getElementById("balance");
let historyList = document.getElementById("history");
let clearbtn = document.getElementById("clearAll");
let deposittext = document.getElementById("totaldeposit");
let withdrawtext = document.getElementById("totalwithdraw");
let count = 1;
let categorySelect = document.getElementById("category");

    let userNameText = document.getElementById("userName");
    let accountNumberText = document.getElementById("accountNumber");
     
    if(historyList.children.length === 0){
    historyList.innerHTML = "<p>No transactions yet</p>";
} 

  function addTransaction(amount , type , category) {
    let currentUser = localStorage.getItem("currentUser");
    category = category.trim().toLowerCase();
        if(historyList.innerHTML.includes("No transactions")){
        historyList.innerHTML = "";
    } 
        let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    let time = new Date().toLocaleString();
    transactions.push({
      amount : amount,
      type : type,
      category : category ,
      date: new Date().toISOString()
    });
    localStorage.setItem(currentUser + "_transactions" , JSON.stringify(transactions));
          if(historyList.children.length===0){
        historyList.innerHTML = "<p>No transactions yet</p>";
       }
       saveData();
        calculateAll();
        renderHistory();
        calculateCategoryTotals();
        updateSummary();
        updateBudgetProgress();
    }   
      
      historyList.addEventListener("click",function(e){
    if(e.target.classList.contains("delete")){
        let li = e.target.parentElement;
        li.remove();
               localStorage.setItem("history" , historyList.innerHTML);
    }
})
    document.getElementById("all").onclick = () => filterCategory("all");
    document.getElementById("food").onclick = () =>filterCategory("food");
    document.getElementById("travel").onclick = () => filterCategory("travel");
    document.getElementById("shopping").onclick = () => filterCategory("shopping");
    document.getElementById("others").onclick = () => filterCategory("others");

   function filterCategory(category){
    let items = document.querySelectorAll("#history li");
    items.forEach(function(li){
        let itemCategory = li.getAttribute("data-category");
        if (category === "all"){
            li.style.display = "block";
        }
        else if (itemCategory=== category) {
            li.style.display = "block";
        } else {
              li.style.display = "none";
        }
    })
};
   
clearbtn.addEventListener("click" , function(){
    historyList.innerHTML = "";
    count = 1 ;
    totaldeposit = 0;
    totalwithdraw= 0;
    deposittext.textContent = " total deposit : " + totaldeposit;
    withdrawtext.textContent = "total withdraw : " + totalwithdraw;
       balance = 0;
    balanceText.textContent = "Balance : 0";
    localStorage.setItem(currentUser + "_balance" , 0);
    localStorage.removeItem(currentUser + "_transactions");
       calculateMonthlyExpense();
      if(historyList.children.length===0){
        historyList.innerHTML = "<p>No transactions yet</p>";
    }
    saveData();
    calculateAll();
    renderHistory();
}
)
 document.getElementById("showdeposit").addEventListener("click", function(){
    let items = document.querySelectorAll("#history li");
    items.forEach(function(li){
        if(li.classList.contains("deposit")){
            li.style.display = "block";
        }
        else{
            li.style.display = "none";
        }
      
 });
})
document.getElementById("showwithdraw").addEventListener("click", function(){
    let items = document.querySelectorAll("#history li");
    items.forEach(function(li){
        if(li.classList.contains("withdraw")){
            li.style.display = "block";
        }
        else{
            li.style.display = "none";
        }
    })
})
document.getElementById("showAll").addEventListener("click", function(){

    let items = document.querySelectorAll("#history li");
    
    items.forEach(function(li){
        li.style.display = "block";
    });
})

function calculateCategoryTotals(){
     let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) ||[] ;
         let totals = {};
         transactions.forEach(function(t){

        if(t.type !== "withdraw"){
            return;
        }

        let category = t.category;
        let amount = Number(t.amount);

        if(!totals[category]){
            totals[category] = 0;
        }

        totals[category] += amount;
    });
        document.getElementById("foodTotal").textContent = "Food : " +totals.food + " rs";
        document.getElementById("travelTotal").textContent = "Travel : " +totals.travel +" rs";
        document.getElementById("shoppingTotal").textContent = "Shopping : " +totals.shopping +" rs";
        document.getElementById("othersTotal").textContent = "Others : " +totals.others +" rs";
        renderChart(totals);
        showtopCategory(totals);
    } 

function calculateMonthlyExpense() {
    let transactions = JSON.parse( localStorage.getItem(currentUser + "_transactions")) || [];
    let total = 0;
    let today = new Date();
    transactions.forEach(function(t) {
        let d = new Date(t.date);
        console.log("TYPE:", t.type);
        if (t.type == "withdraw" && d.getMonth() ===today.getMonth() && d.getFullYear() === today.getFullYear()) {
                       total += Number(t.amount);
        }
    });
        console.log("FINAL TOTAL:", total);
    document.getElementById("monthlyExpense").textContent ="This Month Expense: " + total;
    checkBudget();
} 

document.getElementById("addIncome").addEventListener("click" , function(){
    let amount = Number(document.getElementById("incomeAmount").value);
    let category = document.getElementById("income-category").value; 
    if(amount <= 0){
       alert("Enter Valid Amount");
       return;
    }
       balanceText.textContent = "Balance :" + balance;
        deposittext.textContent = "Total Deposit : " +totaldeposit;
    addTransaction(amount , "deposit" , category);
    calculateMonthlyExpense();
    saveData();
    calculateCategoryTotals();
})

document.getElementById("addExpense").addEventListener("click" , function(){
    let amount = Number(document.getElementById("expenseAmount").value);
    let category = document.getElementById("expense-category").value;
    
    // Calculate current balance from transactions
    let currentUserData = localStorage.getItem("currentUser");
    let allTransactions = JSON.parse(localStorage.getItem(currentUserData + "_transactions")) || [];
    let totalDeposit = 0;
    let totalWithdraw = 0;
    allTransactions.forEach(function(t){
        if(t.type == "deposit"){
            totalDeposit += Number(t.amount);
        }
        else if(t.type == "withdraw"){
            totalWithdraw += Number(t.amount);
        }
    });
    let currentBalance = totalDeposit - totalWithdraw;
    
    if(amount > currentBalance){
        alert("Insufficient Balance");
        return;
    }
    if(amount <= 0){
        alert("Enter Valid Amount");
        return;
    }
    
    balanceText.textContent = "Balance :" + currentBalance;
    withdrawtext.textContent = "Total Withdrawl : " + totalwithdraw;  
    addTransaction(amount ,"withdraw" , category);
    

    if(isSavingsTransaction(category)) {
        addSavingsToGoal(amount);
    }
    
    calculateMonthlyExpense();
    saveData();
    calculateCategoryTotals();
})
   function calculateAll(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    let totalDeposit = 0;
    let totalWithdraw =0;
    transactions.forEach(function(t){
        if(t.type == "deposit"){
            totalDeposit += Number(t.amount);
        }
        else if (t.type == "withdraw"){
            totalWithdraw += Number(t.amount);
        }
    });
      let balance = totalDeposit - totalWithdraw;
      balanceText.textContent = "Balance : " +balance;
      deposittext.textContent = "Total Deposit : " +totalDeposit;
      withdrawtext.textContent= "Total Withdraw : " +totalWithdraw; 
      console.log("Transactions:", transactions);
      updateSummary();
      checkBudget();
 }

  function renderHistory(filter = "all"){
        let currentUser = localStorage.getItem("currentUser");
            if(! currentUser)return;
    historyList.innerHTML = "";
    let transactions = filteredTransactions(filter);
    if (transactions.length === 0){
       historyList.innerHTML = "<p> no transactions yet</p>";
       return;
    }
       transactions.forEach(function(t, index){
        let li = document.createElement("li");
        li.setAttribute("data-category" , t.category);
        li.classList.add(t.type);
        let text = document.createElement("span");
        let time = new Date(t.date).toLocaleString();
        if(t.type === "deposit"){
            text.textContent = (index + 1) + " + " + t.amount + "(" + time + ")" + "(" + t.category + ")" ;
            li.classList.add("green");
        }
        else
        {
            text.textContent = (index + 1) + " -" + t.amount +"(" + time + ")" + "(" + t.category +")";
            li.classList.add("red");
        }
        let delbtn = document.createElement("button");
        delbtn.textContent = "remove";
        delbtn.classList.add("delete");
        li.appendChild(text);
        li.appendChild(delbtn);
         historyList.appendChild(li);
    });
    } 

    document.getElementById("filterall").onclick =() => renderHistory("all");
    document.getElementById("filtermonth").onclick = () => renderHistory("month");
    document.getElementById("filterweek").onclick = () => renderHistory("week");
        
     let expenseChart;

     function renderChart(totals){

    let cx = document.getElementById("expenseChart");

    if(expenseChart){
        expenseChart.destroy();
    }

    let labels = [];
    let data = [];

    let total = 0;

    for(let category in totals){
        total += totals[category];
    }

    if(total === 0){
        return;
    }

    for(let category in totals){

        let amount = totals[category];

        if(amount > 0){

            let percent = ((amount / total) * 100).toFixed(1);

            labels.push(
                category + " (" + percent + "%)"
            );

            data.push(amount);
        }
    }

    expenseChart = new Chart(cx, {
        type: "pie",

        data: {
            labels: labels,

            datasets: [{
                data: data
            }]
        }
    });
}
    
     function showtopCategory(totals){
        let max = 0 ;
        let top = "None";
        for(let key in totals){
            if(totals[key]>max){
                max = totals[key];
                top = key ;
            }
        }
        if(max === 0){
            document.getElementById("topCategory").textContent = "No Expenses Yet" ;
            return;
        }
        document.getElementById("topCategory").textContent = "Top Category :  " + top + " - " + max + "rs";
     }

     function filteredTransactions(filterType){
         let currentUser = localStorage.getItem("currentUser");
         let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions"))|| [];
         let today = new Date();
         return transactions.filter(function(t){
            let d = new Date(t.date);
            if(isNaN(d.getTime())) return false ;
            if(filterType ==="month"){
                return d.getMonth() === today.getMonth() &&
                d.getFullYear() === today.getFullYear();
            }
            if(filterType ==="week"){
                let diff = Math.abs(today -d )/(1000*60*60*24);
                return diff <= 7 ;
            }
              return true;
         })
     }
     function updateSummary(){
        let currentuser = localStorage.getItem("currentUser");
        let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions"));
        let income = 0;
        let expense = 0;
        transactions.forEach(t =>{
            if(t.type === "deposit"){
                income +=Number(t.amount);
            }
            else if(t.type ==="withdraw"){
                expense +=Number(t.amount);
            }
            });
                let savings = income- expense;
        document.getElementById("summaryIncome").textContent = "Income : " +income;
        document.getElementById("summaryExpense").textContent = "Expense : " +expense;
        document.getElementById("summarySavings").textContent = "Savings : " +savings;
     }

     let budget = Number(localStorage.getItem("budget")) || 0 ;

     document.getElementById("setBudget").addEventListener("click" , function(){
        let value = Number(document.getElementById("budgetInput").value);
        if(value <= 0){
            alert("Enter valid Budget");
            return;
        }
        budget = value;
        localStorage.setItem("budget" , budget);
        checkBudget();
        displayBudget();
        updateBudgetProgress();
     });
     
     function checkBudget(){
        let status = document.getElementById("budgetStatus");
        if(!status){
            console.log("no budgetStatus found");
            return;
        }
        let expense = totalwithdraw;
        if (budget===0){
            status.textContent = "No Budget Set";
            return;
        }
        if(expense>budget){
            status.textContent = "Limit exceded";
            status.style.color = "red";
            return;
        }
        else{
            status.textContent = "In Budget";
            status.style.color = "green";
        }
        
        displayBudget();
     }

     function displayBudget(){
        let savedbudget = Number(localStorage.getItem("budget")) || 0;
        let display = document.getElementById("budgetDisplay");
                if(savedbudget >0){
            display.textContent = " Budget : " + savedbudget +"rs";
        }
        else{
            display.textContent = "No Budget Set";
        }
    
    }  
   function updateBudgetProgress(){
    let budget = Number(localStorage.getItem("budget")) || 0;
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) ||[];
   let totalExpense = 0;
   transactions.forEach(t =>{
    if(t.type ==="withdraw"){
        totalExpense += Number(t.amount);
    }
   });
   console.log("total expense" , totalExpense);
   console.log("budget" , budget);
    let percent = 0;
    if(budget>0){
     percent = (totalExpense/budget)*100 ;
    }
    if(isNaN(percent)){
        percent = 0;
    }
     let displayPercent = Math.min(percent , 100);
    if(displayPercent > 100){
        displayPercent = 100;
    }
    let bar = document.getElementById("progressFill");
    let text = document.getElementById("progressText");
    bar.style.width = displayPercent + "%";
    if(percent < 70){
     bar.style.background = "linear-gradient(90deg, #22c55e, #16a34a)";
    }
    else if(percent <100){
        bar.style.background = "linear-gradient(90deg, #f59e0b, #d97706";
    }
    else {
        bar.style.background = "linear-gradient(90deg, #ef4444, #dc2626)"
    }
    if(percent>80){
        alert("you are near budget limit");
    }
    text.textContent =  "Used  " +totalExpense + "rs";
    if(totalExpense > budget){
    text.textContent = "⚠ Budget Exceeded! Used ₹" + totalExpense;
}
   }

   document.getElementById("searchInput").addEventListener("input", function () {

    let value = this.value.toLowerCase();
    let items = document.querySelectorAll("#history li");

    items.forEach(li => {

        let text = li.textContent.toLowerCase();
        let amountMatch = text.match(/\d+/g);
        let amountText = amountMatch ? amountMatch.join(" ") : "";

        if(value === "" || text.includes(value) || amountText.includes(value)){
            li.style.display = "";
        } else {
            li.style.display = "none";
        }
    });
});

function exportData() {

    let items = document.querySelectorAll("#history li");

    let csv = "Data\n"; // header

    items.forEach(li => {
        let text = li.textContent.trim();
        csv += `"${text}"\n`;
    });

    // download file
    let blob = new Blob([csv], { type: "text/csv" });
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "history_data.csv";
    a.click();

    URL.revokeObjectURL(url);
}
   

function addSavingsGoal(){
    let goalName = document.getElementById("goalName").value;
    let goalAmount = document.getElementById("goalAmount").value;
    
    if(goalName === "" || goalAmount === ""){
        alert("Please enter goal name and amount");
        return;
    }
    
    let currentUser = localStorage.getItem("currentUser");
    let goals = JSON.parse(localStorage.getItem(currentUser + "_goals")) || [];
    
    let goal = {
        id: Date.now(),
        name: goalName,
        targetAmount: Number(goalAmount),
        currentAmount: 0,
        createdDate: new Date().toLocaleDateString(),
        status: "active"
    };
    
    goals.push(goal);
    localStorage.setItem(currentUser + "_goals", JSON.stringify(goals));
    
    document.getElementById("goalName").value = "";
    document.getElementById("goalAmount").value = "";
    
    displaySavingsGoals();
    alert("Goal added successfully!");
}

function displaySavingsGoals(){
    let currentUser = localStorage.getItem("currentUser");
    let goals = JSON.parse(localStorage.getItem(currentUser + "_goals")) || [];
    let goalsList = document.getElementById("goalsList");
    
    if(goals.length === 0){
        goalsList.innerHTML = '<p class="empty-state">No goals set yet</p>';
        return;
    }
    
    let html = '';
    goals.forEach(goal => {
        let progress = (goal.currentAmount / goal.targetAmount) * 100;
        progress = Math.min(progress, 100);
        
        html += `
            <div class="goal-item">
                <div class="goal-info">
                    <h5>${goal.name}</h5>
                    <p>Target: ₹${goal.targetAmount} | Saved: ₹${goal.currentAmount}</p>
                    <div class="goal-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <p class="progress-text">${progress.toFixed(1)}% Complete</p>
                    </div>
                </div>
                <button class="btn btn-small btn-danger" onclick="deleteGoal(${goal.id})">Delete</button>
            </div>
        `;
    });
    
    goalsList.innerHTML = html;
}

function deleteGoal(goalId){
    let currentUser = localStorage.getItem("currentUser");
    let goals = JSON.parse(localStorage.getItem(currentUser + "_goals")) || [];
    
    goals = goals.filter(g => g.id !== goalId);
    localStorage.setItem(currentUser + "_goals", JSON.stringify(goals));
    
    displaySavingsGoals();
}

function addRecurringTransaction(){
    let name = document.getElementById("recurringName").value;
    let amount = document.getElementById("recurringAmount").value;
    let type = document.getElementById("recurringType").value;
    let frequency = document.getElementById("recurringFrequency").value;
    
    if(name === "" || amount === ""){
        alert("Please enter all details");
        return;
    }
    
    let currentUser = localStorage.getItem("currentUser");
    let recurring = JSON.parse(localStorage.getItem(currentUser + "_recurring")) || [];
    
    let transaction = {
        id: Date.now(),
        name: name,
        amount: Number(amount),
        type: type,
        frequency: frequency,
        createdDate: new Date().toLocaleDateString(),
        lastProcessed: new Date().toLocaleDateString()
    };
    
    recurring.push(transaction);
    localStorage.setItem(currentUser + "_recurring", JSON.stringify(recurring));
    
    document.getElementById("recurringName").value = "";
    document.getElementById("recurringAmount").value = "";
    
    displayRecurringTransactions();
    alert("Recurring transaction added!");
}

function displayRecurringTransactions(){
    let currentUser = localStorage.getItem("currentUser");
    let recurring = JSON.parse(localStorage.getItem(currentUser + "_recurring")) || [];
    let recurringList = document.getElementById("recurringList");
    
    if(recurring.length === 0){
        recurringList.innerHTML = '<p class="empty-state">No recurring transactions set</p>';
        return;
    }
    
    let html = '';
    recurring.forEach(trans => {
        let icon = trans.type === "income" ? "📥" : "📤";
        let color = trans.type === "income" ? "income" : "expense";
        
        html += `
            <div class="recurring-item">
                <div class="recurring-info">
                    <span class="recurring-icon">${icon}</span>
                    <div class="recurring-details">
                        <h5>${trans.name}</h5>
                        <p>₹${trans.amount} | ${trans.frequency} | ${trans.type}</p>
                    </div>
                </div>
                <button class="btn btn-small btn-danger" onclick="deleteRecurring(${trans.id})">Remove</button>
            </div>
        `;
    });
    
    recurringList.innerHTML = html;
}

function deleteRecurring(recurringId){
    let currentUser = localStorage.getItem("currentUser");
    let recurring = JSON.parse(localStorage.getItem(currentUser + "_recurring")) || [];
    
    recurring = recurring.filter(r => r.id !== recurringId);
    localStorage.setItem(currentUser + "_recurring", JSON.stringify(recurring));
    
    displayRecurringTransactions();
}

function processRecurringTransactions(){
    let currentUser = localStorage.getItem("currentUser");
    let recurring = JSON.parse(localStorage.getItem(currentUser + "_recurring")) || [];
    let today = new Date().toLocaleDateString();
    
    recurring.forEach(trans => {
        let lastProcessed = new Date(trans.lastProcessed);
        let today_date = new Date();
        let daysDiff = Math.floor((today_date - lastProcessed) / (1000 * 60 * 60 * 24));
        
        let shouldProcess = false;
        if(trans.frequency === "daily" && daysDiff >= 1) shouldProcess = true;
        if(trans.frequency === "weekly" && daysDiff >= 7) shouldProcess = true;
        if(trans.frequency === "monthly" && daysDiff >= 30) shouldProcess = true;
        if(trans.frequency === "yearly" && daysDiff >= 365) shouldProcess = true;
        
        if(shouldProcess){
            addTransaction(trans.amount, trans.type === "income" ? "deposit" : "withdraw", "recurring");
            trans.lastProcessed = today;
        }
    });
    
    localStorage.setItem(currentUser + "_recurring", JSON.stringify(recurring));
}

function calculateFinancialHealthScore(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    let budget = Number(localStorage.getItem(currentUser + "_budget")) || 0;
    
    let totalDeposit = 0, totalWithdraw = 0;
    transactions.forEach(t => {
        if(t.type === "deposit") totalDeposit += Number(t.amount);
        else totalWithdraw += Number(t.amount);
    });
    
    let balance = totalDeposit - totalWithdraw;
    let savingsRate = totalDeposit > 0 ? (balance / totalDeposit) * 100 : 0;
    let budgetAdherence = budget > 0 ? Math.max(0, 100 - (totalWithdraw / budget) * 100) : 50;
    
    let score = (savingsRate * 0.4) + (budgetAdherence * 0.6);
    score = Math.min(100, Math.max(0, score));
    
    let status = score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Fair" : "Poor";
    
    document.getElementById("healthScore").textContent = score.toFixed(0) + "%";
    document.getElementById("healthStatus").textContent = "Status: " + status;
    
    return score;
}

function generateSpendingInsights(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    let categorySpending = {};
    let monthlySpending = {};
    
    transactions.forEach(t => {
        if(t.type === "withdraw"){
            categorySpending[t.category] = (categorySpending[t.category] || 0) + Number(t.amount);
            
            let month = new Date(t.date).toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
            monthlySpending[month] = (monthlySpending[month] || 0) + Number(t.amount);
        }
    });
    
    let insights = [];
    let maxCategory = Object.keys(categorySpending).reduce((a, b) => 
        categorySpending[a] > categorySpending[b] ? a : b, "");
    if(maxCategory){
        insights.push(`💡 Highest spending: ${maxCategory} (₹${categorySpending[maxCategory]})`);
    }
    
    // Find lowest spending category
    let minCategory = Object.keys(categorySpending).reduce((a, b) => 
        categorySpending[a] < categorySpending[b] ? a : b, "");
    if(minCategory && minCategory !== maxCategory){
        insights.push(`💡 Lowest spending: ${minCategory} (₹${categorySpending[minCategory]})`);
    }
    
    // Average monthly spending
    let avgMonthly = Object.values(monthlySpending).reduce((a, b) => a + b, 0) / Object.keys(monthlySpending).length;
    if(avgMonthly > 0){
        insights.push(`💡 Average monthly spending: ₹${avgMonthly.toFixed(0)}`);
    }
    
    // Spending trend
    let months = Object.keys(monthlySpending).sort();
    if(months.length >= 2){
        let lastMonth = monthlySpending[months[months.length - 1]];
        let prevMonth = monthlySpending[months[months.length - 2]];
        let trend = lastMonth > prevMonth ? "📈 Increasing" : "📉 Decreasing";
        insights.push(`💡 Spending trend: ${trend}`);
    }
    
    displayInsights(insights);
}

function displayInsights(insights){
    let insightsList = document.getElementById("spendingInsights");
    
    if(insights.length === 0){
        insightsList.innerHTML = '<p class="empty-state">No insights yet</p>';
        return;
    }
    
    let html = '';
    insights.forEach(insight => {
        html += `<p class="insight-item">${insight}</p>`;
    });
    
    insightsList.innerHTML = html;
}

function generateMonthlyTrend(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    let monthlyData = {};
    
    transactions.forEach(t => {
        let month = new Date(t.date).toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
        if(!monthlyData[month]){
            monthlyData[month] = {income: 0, expense: 0};
        }
        if(t.type === "deposit"){
            monthlyData[month].income += Number(t.amount);
        } else {
            monthlyData[month].expense += Number(t.amount);
        }
    });
    
    let trendList = document.getElementById("monthlyTrend");
    
    if(Object.keys(monthlyData).length === 0){
        trendList.innerHTML = '<p class="empty-state">No trend data</p>';
        return;
    }
    
    let html = '';
    Object.keys(monthlyData).forEach(month => {
        let data = monthlyData[month];
        let balance = data.income - data.expense;
        let balanceClass = balance >= 0 ? 'income' : 'expense';
        
        html += `
            <div class="trend-item">
                <span class="trend-month">${month}</span>
                <span class="trend-data">📥 ₹${data.income} | 📤 ₹${data.expense} | <span class="${balanceClass}">Balance: ₹${balance}</span></span>
            </div>
        `;
    });
    
    trendList.innerHTML = html;
}

// ============================================
// 4. ADVANCED REPORTING
// ============================================

function generateMonthlyReport(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    let currentMonth = new Date().toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
    let monthTransactions = transactions.filter(t => {
        let tMonth = new Date(t.date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
        return tMonth === currentMonth;
    });
    
    let totalIncome = 0, totalExpense = 0;
    let categoryBreakdown = {};
    
    monthTransactions.forEach(t => {
        if(t.type === "deposit"){
            totalIncome += Number(t.amount);
        } else {
            totalExpense += Number(t.amount);
            categoryBreakdown[t.category] = (categoryBreakdown[t.category] || 0) + Number(t.amount);
        }
    });
    
    let report = {
        month: currentMonth,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        balance: totalIncome - totalExpense,
        transactionCount: monthTransactions.length,
        categoryBreakdown: categoryBreakdown
    };
    
    return report;
}

function generateYearlyReport(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    let currentYear = new Date().getFullYear();
    let yearTransactions = transactions.filter(t => {
        let tYear = new Date(t.date).getFullYear();
        return tYear === currentYear;
    });
    
    let totalIncome = 0, totalExpense = 0;
    
    yearTransactions.forEach(t => {
        if(t.type === "deposit"){
            totalIncome += Number(t.amount);
        } else {
            totalExpense += Number(t.amount);
        }
    });
    
    let report = {
        year: currentYear,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        balance: totalIncome - totalExpense,
        transactionCount: yearTransactions.length,
        averageMonthlyIncome: totalIncome / 12,
        averageMonthlyExpense: totalExpense / 12
    };
    
    return report;
}

function exportDetailedReport(){
    let monthlyReport = generateMonthlyReport();
    let yearlyReport = generateYearlyReport();
    
    let reportData = {
        generatedDate: new Date().toLocaleString(),
        monthlyReport: monthlyReport,
        yearlyReport: yearlyReport,
        healthScore: calculateFinancialHealthScore()
    };
    
    let json = JSON.stringify(reportData, null, 2);
    let blob = new Blob([json], {type: 'application/json'});
    let url = URL.createObjectURL(blob);
    
    let a = document.createElement('a');
    a.href = url;
    a.download = 'financial_report_' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    
    URL.revokeObjectURL(url);
}

// ============================================
// 5. TRANSACTION TAGS & ADVANCED FILTERING
// ============================================

function addTransactionTag(transactionId, tag){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    let transaction = transactions.find(t => t.id === transactionId);
    if(transaction){
        if(!transaction.tags) transaction.tags = [];
        if(!transaction.tags.includes(tag)){
            transaction.tags.push(tag);
        }
        localStorage.setItem(currentUser + "_transactions", JSON.stringify(transactions));
    }
}

function filterByTag(tag){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    return transactions.filter(t => t.tags && t.tags.includes(tag));
}

// ============================================
// 6. BUDGET ALERTS SYSTEM
// ============================================

function checkBudgetAlerts(){
    let currentUser = localStorage.getItem("currentUser");
    let budget = Number(localStorage.getItem(currentUser + "_budget")) || 0;
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    let currentMonth = new Date().toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
    let monthlyExpense = 0;
    
    transactions.forEach(t => {
        let tMonth = new Date(t.date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
        if(tMonth === currentMonth && t.type === "withdraw"){
            monthlyExpense += Number(t.amount);
        }
    });
    
    if(budget > 0){
        let percentageUsed = (monthlyExpense / budget) * 100;
        
        if(percentageUsed >= 100){
            return {alert: true, message: "⚠️ Budget Exceeded!", percentage: percentageUsed};
        } else if(percentageUsed >= 80){
            return {alert: true, message: "⚠️ Budget Warning: 80% used", percentage: percentageUsed};
        } else if(percentageUsed >= 50){
            return {alert: false, message: "ℹ️ Budget: 50% used", percentage: percentageUsed};
        }
    }
    
    return {alert: false, message: "✓ Budget on track", percentage: 0};
}

// ============================================
// 7. MULTI-ACCOUNT SUPPORT
// ============================================

function getAccountSummary(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    let totalDeposit = 0, totalWithdraw = 0;
    transactions.forEach(t => {
        if(t.type === "deposit") totalDeposit += Number(t.amount);
        else totalWithdraw += Number(t.amount);
    });
    
    return {
        accountName: currentUser.split("_")[0],
        accountNumber: currentUser.split("_")[1],
        totalIncome: totalDeposit,
        totalExpense: totalWithdraw,
        balance: totalDeposit - totalWithdraw,
        transactionCount: transactions.length
    };
}

// ============================================
// 8. DATA ANALYTICS HELPER FUNCTIONS
// ============================================

function getHighestSpendingCategory(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    let categorySpending = {};
    transactions.forEach(t => {
        if(t.type === "withdraw"){
            categorySpending[t.category] = (categorySpending[t.category] || 0) + Number(t.amount);
        }
    });
    
    return Object.keys(categorySpending).reduce((a, b) => 
        categorySpending[a] > categorySpending[b] ? a : b, "");
}

function getAverageTransactionAmount(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    if(transactions.length === 0) return 0;
    
    let total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
    return total / transactions.length;
}

function getSpendingTrend(){
    let currentUser = localStorage.getItem("currentUser");
    let transactions = JSON.parse(localStorage.getItem(currentUser + "_transactions")) || [];
    
    let monthlySpending = {};
    transactions.forEach(t => {
        if(t.type === "withdraw"){
            let month = new Date(t.date).toLocaleDateString('en-US', {month: 'short'});
            monthlySpending[month] = (monthlySpending[month] || 0) + Number(t.amount);
        }
    });
    
    let months = Object.keys(monthlySpending);
    if(months.length < 2) return "insufficient data";
    
    let lastMonth = monthlySpending[months[months.length - 1]];
    let prevMonth = monthlySpending[months[months.length - 2]];
    
    return lastMonth > prevMonth ? "increasing" : "decreasing";
}

// ============================================
// FIXED: SAVINGS TO GOALS LINKING (USER-SPECIFIC)
// ============================================

// Function to check if transaction is "Savings" category
function isSavingsTransaction(category) {
    return category.toLowerCase() === "savings" || 
           category.toLowerCase() === "save" ||
           category.toLowerCase() === "saving";
}

// Function to get selected savings goal for current user
function getSelectedSavingsGoal() {
    let currentUser = localStorage.getItem("currentUser");
    return localStorage.getItem(currentUser + "_selectedSavingsGoal");
}

// Function to set selected savings goal for current user
function setSelectedSavingsGoal(goalId) {
    let currentUser = localStorage.getItem("currentUser");
    if(goalId === "" || goalId === null) {
        localStorage.removeItem(currentUser + "_selectedSavingsGoal");
    } else {
        localStorage.setItem(currentUser + "_selectedSavingsGoal", goalId);
    }
}

// Function to update the savings goal dropdown
function updateSavingsGoalDropdown() {
    let currentUser = localStorage.getItem("currentUser");
    if(!currentUser) return;
    
    let goals = JSON.parse(localStorage.getItem(currentUser + "_goals")) || [];
    let select = document.getElementById("savingsGoalSelect");
    
    if(!select) return; // Element doesn't exist yet
    
    // Clear existing options except the first one
    select.innerHTML = '<option value="">-- Select Goal to Link --</option>';
    
    // Add all active goals to the dropdown
    goals.forEach(goal => {
        if(goal.status === "active") {
            let option = document.createElement("option");
            option.value = goal.id;
            option.textContent = goal.name + " (₹" + goal.currentAmount + " / ₹" + goal.targetAmount + ")";
            select.appendChild(option);
        }
    });
    
    // Restore previously selected goal
    let selectedGoal = getSelectedSavingsGoal();
    if(selectedGoal) {
        select.value = selectedGoal;
        displaySavingsStatus();
    }
}

// Function to select which goal to allocate savings to
function selectSavingsGoal() {
    let select = document.getElementById("savingsGoalSelect");
    if(!select) return;
    
    let goalId = select.value;
    
    if(goalId === "") {
        document.getElementById("savingsLinkStatus").textContent = "❌ Please select a goal";
        document.getElementById("savingsLinkStatus").style.color = "#dc2626";
        setSelectedSavingsGoal("");
        return;
    }
    
    let currentUser = localStorage.getItem("currentUser");
    let goals = JSON.parse(localStorage.getItem(currentUser + "_goals")) || [];
    let selectedGoal = goals.find(g => g.id == goalId);
    
    if(selectedGoal) {
        setSelectedSavingsGoal(goalId);
        document.getElementById("savingsLinkStatus").textContent = 
            "✅ Savings will be added to: \"" + selectedGoal.name + "\"";
        document.getElementById("savingsLinkStatus").style.color = "#059669";
    }
}

// Function to add savings amount to selected goal
function addSavingsToGoal(savingsAmount) {
    let selectedGoalId = getSelectedSavingsGoal();
    
    if(!selectedGoalId) {
        return; // No goal selected, skip
    }
    
    let currentUser = localStorage.getItem("currentUser");
    let goals = JSON.parse(localStorage.getItem(currentUser + "_goals")) || [];
    
    let goal = goals.find(g => g.id == selectedGoalId);
    if(goal) {
        goal.currentAmount += Number(savingsAmount);
        
        // Check if goal is completed
        if(goal.currentAmount >= goal.targetAmount) {
            goal.status = "completed";
            goal.completedDate = new Date().toLocaleDateString();
            alert("🎉 Congratulations! You've completed your goal: \"" + goal.name + "\"!");
        }
        
        localStorage.setItem(currentUser + "_goals", JSON.stringify(goals));
        displaySavingsGoals();
        updateSavingsGoalDropdown();
    }
}

// Function to display savings allocation status
function displaySavingsStatus() {
    let currentUser = localStorage.getItem("currentUser");
    if(!currentUser) return;
    
    let goals = JSON.parse(localStorage.getItem(currentUser + "_goals")) || [];
    let statusDiv = document.getElementById("savingsLinkStatus");
    
    if(!statusDiv) return; // Element doesn't exist yet
    
    if(goals.length === 0) {
        statusDiv.textContent = "Create a goal first to allocate savings";
        statusDiv.style.color = "#6b7280";
        return;
    }
    
    let selectedGoalId = getSelectedSavingsGoal();
    if(!selectedGoalId) {
        statusDiv.textContent = "❌ Please select a goal";
        statusDiv.style.color = "#dc2626";
        return;
    }
    
    let selectedGoal = goals.find(g => g.id == selectedGoalId);
    if(selectedGoal) {
        statusDiv.textContent = "✅ Savings will be added to: \"" + selectedGoal.name + "\"";
        statusDiv.style.color = "#059669";
    }
}



document.getElementById("addGoal").addEventListener("click", addSavingsGoal);
document.getElementById("addRecurring").addEventListener("click", addRecurringTransaction);

// Initialize advanced features on page load
window.addEventListener("load", function(){
    setTimeout(() => {
        displaySavingsGoals();
        updateSavingsGoalDropdown();
        displaySavingsStatus();
        displayRecurringTransactions();
        calculateFinancialHealthScore();
        generateSpendingInsights();
        generateMonthlyTrend();
        processRecurringTransactions();
    }, 500);
});

// Update analytics every time a transaction is added
function updateAnalytics(){
    calculateFinancialHealthScore();
    generateSpendingInsights();
    generateMonthlyTrend();
}
