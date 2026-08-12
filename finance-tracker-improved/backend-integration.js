let currentUserId = null;
let currentAccountId = null;
let useBackend = true;

function setupLoginForm() {
    const nameInput = document.getElementById('loginName');
    const accInput = document.getElementById('loginAcc');

    if (nameInput && accInput) {
        nameInput.placeholder = 'Enter your email';
        nameInput.type = 'email';
        nameInput.id = 'loginEmail';

        accInput.placeholder = 'Enter your password (min 8 characters)';
        accInput.type = 'password';
        accInput.id = 'loginPassword';

        const nameLabel = document.querySelector('label[for="loginName"]');
        if (nameLabel) nameLabel.textContent = 'Email:';

        const accLabel = document.querySelector('label[for="loginAcc"]');
        if (accLabel) accLabel.textContent = 'Password:';
    }
}

function unwrapApiResponse(payload) {
    if (payload && typeof payload === 'object' && 'data' in payload) {
        return payload.data;
    }
    return payload;
}

function getCurrentStorageKey() {
    return localStorage.getItem('currentUser') || `backend_user_${Date.now()}`;
}

function mapBackendGoalToLocal(goal) {
    return {
        id: goal.goalId,
        goalId: goal.goalId,
        name: goal.goalName,
        targetAmount: Number(goal.targetAmount),
        currentAmount: Number(goal.currentAmount || 0),
        createdDate: goal.createdAt ? new Date(goal.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
        status: (goal.status || 'ACTIVE').toLowerCase()
    };
}

async function ensureUser(email, password) {
    const allUsersResponse = await UserService.getAllUsers();
    const allUsers = unwrapApiResponse(allUsersResponse) || [];
    const existingUser = allUsers.find(user => (user.email || '').toLowerCase() === email.toLowerCase());

    if (existingUser) {
        return existingUser;
    }

    const createdUser = await UserService.createUser(email, email, password);
    return createdUser?.data || createdUser;
}

async function ensureAccount(userId, email) {
    const allAccountsResponse = await AccountService.getAllAccounts();
    const allAccounts = unwrapApiResponse(allAccountsResponse) || [];
    const existingAccount = allAccounts.find(account => String(account.userId) === String(userId));

    if (existingAccount) {
        return existingAccount;
    }

    const createdAccount = await AccountService.createAccount(userId, `Account for ${email}`, 'BANK', 0);
    return createdAccount?.data || createdAccount;
}

async function ensureCategory(userId, categoryName, type) {
    const categoriesResponse = await CategoryService.getCategoriesByUser(userId);
    const categories = unwrapApiResponse(categoriesResponse) || [];
    const normalizedName = (categoryName || '').trim().toLowerCase();
    const existing = categories.find(category => (category.categoryName || '').trim().toLowerCase() === normalizedName);

    if (existing) {
        return existing;
    }

    const createdCategory = await CategoryService.createCategory(userId, categoryName, type);
    return createdCategory?.data || createdCategory;
}

async function ensureDefaultCategories(userId) {
    const categoriesResponse = await CategoryService.getCategoriesByUser(userId);
    const categories = unwrapApiResponse(categoriesResponse) || [];
    const catalog = [
        { categoryName: 'Salary', type: 'income' },
        { categoryName: 'Food', type: 'expense' },
        { categoryName: 'Travel', type: 'expense' },
        { categoryName: 'Shopping', type: 'expense' },
        { categoryName: 'Entertainment', type: 'expense' },
        { categoryName: 'Utilities', type: 'expense' },
        { categoryName: 'Savings', type: 'expense' },
        { categoryName: 'Others', type: 'expense' }
    ];

    for (const item of catalog) {
        const exists = categories.some(category => (category.categoryName || '').trim().toLowerCase() === item.categoryName.toLowerCase());
        if (!exists) {
            await CategoryService.createCategory(userId, item.categoryName, item.type);
        }
    }

    return await CategoryService.getCategoriesByUser(userId);
}

async function syncAccountBalanceFromBackend() {
    if (!currentAccountId) {
        return;
    }

    try {
        const response = await AccountService.getAccountById(currentAccountId);
        const account = unwrapApiResponse(response);
        if (!account || account.currentBalance == null) {
            return;
        }

        const storageKey = getCurrentStorageKey();
        localStorage.setItem(`${storageKey}_balance`, account.currentBalance);

        const balanceText = document.getElementById('balance');
        if (balanceText) {
            balanceText.textContent = 'Balance : ' + Number(account.currentBalance);
        }
    } catch (error) {
        console.warn('Unable to sync account balance from the backend:', error);
    }
}

function normalizeFrequency(frequency) {
    const normalized = (frequency || '').trim().toLowerCase();
    const map = {
        daily: 'DAILY',
        weekly: 'WEEKLY',
        monthly: 'MONTHLY',
        yearly: 'YEARLY'
    };
    return map[normalized] || normalized.toUpperCase();
}

function calculateNextDueDate(frequency) {
    const next = new Date();
    switch (normalizeFrequency(frequency)) {
        case 'DAILY':
            next.setDate(next.getDate() + 1);
            break;
        case 'WEEKLY':
            next.setDate(next.getDate() + 7);
            break;
        case 'MONTHLY':
            next.setMonth(next.getMonth() + 1);
            break;
        case 'YEARLY':
            next.setFullYear(next.getFullYear() + 1);
            break;
        default:
            next.setMonth(next.getMonth() + 1);
            break;
    }
    return next.toISOString().split('T')[0];
}

function mapBackendRecurringToLocal(recurring) {
    const categoryName = (recurring.categoryName || 'Recurring').toLowerCase();
    const isIncome = categoryName.includes('salary') || categoryName.includes('income');

    return {
        id: recurring.recurringId,
        recurringId: recurring.recurringId,
        name: recurring.categoryName || 'Recurring',
        amount: Number(recurring.amount),
        type: isIncome ? 'income' : 'expense',
        frequency: (recurring.frequency || 'MONTHLY').toLowerCase(),
        createdDate: recurring.createdAt ? new Date(recurring.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
        lastProcessed: new Date().toLocaleDateString()
    };
}

async function loadBudgetFromBackend() {
    if (!currentUserId) {
        return;
    }

    try {
        const response = await BudgetService.getAllBudgets();
        const allBudgets = unwrapApiResponse(response) || [];
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const currentBudget = allBudgets.find(budget =>
            String(budget.userId) === String(currentUserId) &&
            Number(budget.budgetMonth) === month &&
            Number(budget.budgetYear) === year
        );

        const amount = currentBudget ? Number(currentBudget.budgetAmount) : 0;
        const storageKey = getCurrentStorageKey();
        localStorage.setItem('budget', amount);
        localStorage.setItem(`${storageKey}_budget`, amount);

        if (typeof displayBudget === 'function') {
            displayBudget();
        }
        if (typeof updateBudgetProgress === 'function') {
            updateBudgetProgress();
        }
        if (typeof checkBudget === 'function') {
            checkBudget();
        }
    } catch (error) {
        console.warn('Unable to sync budget from the backend:', error);
    }
}

async function loadRecurringFromBackend() {
    if (!currentUserId || !currentAccountId) {
        return;
    }

    try {
        const response = await RecurringTransactionService.getAllRecurringTransactions();
        const allRecurring = unwrapApiResponse(response) || [];
        const userRecurring = allRecurring
            .filter(item =>
                String(item.userId) === String(currentUserId) &&
                String(item.accountId) === String(currentAccountId)
            )
            .map(mapBackendRecurringToLocal);

        const storageKey = getCurrentStorageKey();
        localStorage.setItem(`${storageKey}_recurring`, JSON.stringify(userRecurring));

        if (typeof displayRecurringTransactions === 'function') {
            displayRecurringTransactions();
        }
    } catch (error) {
        console.warn('Unable to sync recurring transactions from the backend:', error);
    }
}

async function loadGoalsFromBackend() {
    if (!currentUserId) {
        return;
    }

    try {
        const response = await GoalService.getAllGoals();
        const allGoals = unwrapApiResponse(response) || [];
        const userGoals = allGoals
            .filter(goal => String(goal.userId) === String(currentUserId))
            .map(mapBackendGoalToLocal);

        const storageKey = getCurrentStorageKey();
        localStorage.setItem(`${storageKey}_goals`, JSON.stringify(userGoals));

        if (typeof window.displaySavingsGoals === 'function') {
            window.displaySavingsGoals();
        }
        if (typeof window.updateSavingsGoalDropdown === 'function') {
            window.updateSavingsGoalDropdown();
        }
        if (typeof window.displaySavingsStatus === 'function') {
            window.displaySavingsStatus();
        }
    } catch (error) {
        console.warn('Unable to sync goals from the backend:', error);
    }
}

async function loadTransactionsFromBackend() {
    if (!currentUserId || !currentAccountId) {
        return;
    }

    try {
        const response = await TransactionService.getAllTransactions();
        const transactions = unwrapApiResponse(response) || [];
        const accountTransactions = (transactions || []).filter(transaction => String(transaction.accountId) === String(currentAccountId));
        const normalizedTransactions = accountTransactions.map(transaction => ({
            amount: transaction.amount,
            type: String(transaction.transactionType || '').toLowerCase() === 'income' ? 'deposit' : 'withdraw',
            category: (transaction.categoryName || 'others').toString().trim().toLowerCase(),
            date: transaction.transactionDate || new Date().toISOString()
        }));

        const storageKey = getCurrentStorageKey();
        localStorage.setItem(`${storageKey}_transactions`, JSON.stringify(normalizedTransactions));
        localStorage.setItem('currentUser', storageKey);
        localStorage.setItem('currentUserId', currentUserId);
        localStorage.setItem('currentAccountId', currentAccountId);

        if (typeof window.calculateAll === 'function') {
            window.calculateAll();
        }
        if (typeof window.renderHistory === 'function') {
            window.renderHistory('all');
        }
        if (typeof window.calculateCategoryTotals === 'function') {
            window.calculateCategoryTotals();
        }
        if (typeof window.updateSummary === 'function') {
            window.updateSummary();
        }
        if (typeof window.displayBudget === 'function') {
            window.displayBudget();
        }
        if (typeof window.updateBudgetProgress === 'function') {
            window.updateBudgetProgress();
        }

        await syncAccountBalanceFromBackend();
        await loadGoalsFromBackend();
        await loadBudgetFromBackend();
        await loadRecurringFromBackend();
    } catch (error) {
        console.warn('Unable to sync transactions from the backend:', error);
    }
}

function updateDashboard(email, accountName) {
    const loginPage = document.getElementById('loginPage');
    const appPage = document.getElementById('appPage');
    const userName = document.getElementById('userName');
    const accountNumber = document.getElementById('accountNumber');

    if (loginPage) loginPage.style.display = 'none';
    if (appPage) appPage.style.display = 'block';
    if (userName) userName.textContent = `Welcome ${email}`;
    if (accountNumber) accountNumber.textContent = `Account: ${accountName}`;
}

function attachLoginHandler() {
    const loginBtn = document.getElementById('loginBtn');
    if (!loginBtn) {
        return;
    }

    const replacementBtn = loginBtn.cloneNode(true);
    loginBtn.replaceWith(replacementBtn);

    replacementBtn.addEventListener('click', async function(event) {
        event.preventDefault();

        const emailInput = document.getElementById('loginEmail') || document.getElementById('loginName');
        const passwordInput = document.getElementById('loginPassword') || document.getElementById('loginAcc');
        const email = (emailInput?.value || '').trim();
        const password = (passwordInput?.value || '').trim();

        if (!email || !password) {
            alert('Please enter email and password');
            return;
        }
        if (!email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }

        try {
            const user = await ensureUser(email, password);
            currentUserId = user.userId || user.id;
            const account = await ensureAccount(currentUserId, email);
            currentAccountId = account.accountId || account.id;
            await ensureDefaultCategories(currentUserId);

            localStorage.setItem('currentUser', `${email}_${currentAccountId}`);
            localStorage.setItem('currentUserId', currentUserId);
            localStorage.setItem('currentAccountId', currentAccountId);
            localStorage.setItem('currentUserEmail', email);

            updateDashboard(email, currentAccountId);
            await loadTransactionsFromBackend();
            alert('Login successful');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: ' + error.message);
        }
    });
}

function attachLogoutHandler() {
    const logoutBtn = document.getElementById('logout');
    if (!logoutBtn) {
        return;
    }

    logoutBtn.addEventListener('click', function() {
        currentUserId = null;
        currentAccountId = null;
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('currentAccountId');
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('currentUser');
        window.location.reload();
    });
}

function replaceButtonHandler(buttonId, handler) {
    const button = document.getElementById(buttonId);
    if (!button) {
        return null;
    }

    const replacementBtn = button.cloneNode(true);
    button.replaceWith(replacementBtn);
    replacementBtn.addEventListener('click', handler);
    return replacementBtn;
}

function wrapTransactionSave() {
    const originalAddTransaction = window.addTransaction;

    if (typeof originalAddTransaction !== 'function') {
        return;
    }

    window.addTransaction = async function(amount, type, category) {
        if (!amount || !type || !category) {
            amount = document.getElementById('amount').value;
            type = document.querySelector('input[name="type"]:checked').value;
            category = document.getElementById('category').value;
        }

        originalAddTransaction(amount, type, category);

        if (!useBackend || !currentUserId || !currentAccountId) {
            return;
        }

        try {
            const normalizedCategory = (category || 'Others').toString().trim();
            const transactionType = type === 'deposit' ? 'income' : 'expense';
            const categoryType = type === 'deposit' ? 'income' : 'expense';
            const selectedCategory = await ensureCategory(currentUserId, normalizedCategory, categoryType);
            const categoryId = selectedCategory.categoryId || selectedCategory.id;

            const response = await TransactionService.createTransaction(
                currentUserId,
                currentAccountId,
                categoryId,
                Number(amount),
                transactionType,
                normalizedCategory
            );

            const savedTransaction = unwrapApiResponse(response);
            const selectedGoalId = typeof window.getSelectedSavingsGoal === 'function'
                ? window.getSelectedSavingsGoal()
                : null;

            if (
                selectedGoalId &&
                typeof window.isSavingsTransaction === 'function' &&
                window.isSavingsTransaction(category) &&
                savedTransaction?.transactionId
            ) {
                await GoalTransactionService.createGoalTransaction(
                    Number(selectedGoalId),
                    savedTransaction.transactionId,
                    Number(amount)
                );
            }

            await loadTransactionsFromBackend();
        } catch (error) {
            console.warn('Backend transaction save failed:', error);
        }
    };
}

function wrapGoalSave() {
    const originalAddSavingsGoal = window.addSavingsGoal;

    if (typeof originalAddSavingsGoal !== 'function') {
        console.warn('addSavingsGoal function not found');
        return;
    }

    replaceButtonHandler('addGoal', async function(event) {
        event.preventDefault();

        const goalName = document.getElementById('goalName').value.trim();
        const goalAmount = document.getElementById('goalAmount').value.trim();

        if (!goalName || !goalAmount) {
            alert('Please enter goal name and amount');
            return;
        }

        if (useBackend && currentUserId) {
            try {
                await GoalService.createGoal(
                    currentUserId,
                    goalName,
                    Number(goalAmount),
                    0,
                    null,
                    'ACTIVE'
                );
                document.getElementById('goalName').value = '';
                document.getElementById('goalAmount').value = '';
                await loadGoalsFromBackend();
                alert('Goal added successfully!');
                return;
            } catch (error) {
                console.error('Backend goal save failed:', error);
                alert('Failed to save goal: ' + error.message);
                return;
            }
        }

        originalAddSavingsGoal();
    });
}

function wrapGoalDelete() {
    const originalDeleteGoal = window.deleteGoal;

    if (typeof originalDeleteGoal !== 'function') {
        return;
    }

    window.deleteGoal = async function(goalId) {
        if (useBackend && currentUserId) {
            try {
                await GoalService.deleteGoal(goalId);
                await loadGoalsFromBackend();
                return;
            } catch (error) {
                console.warn('Backend goal delete failed, falling back to local storage:', error);
            }
        }

        originalDeleteGoal(goalId);
    };
}

function wrapSavingsGoalUpdate() {
    // Goal progress is synced via GoalTransactionService inside wrapTransactionSave.
    // Keep local UI updates from the original function only.
}

function wrapBudgetSave() {
    replaceButtonHandler('setBudget', async function(event) {
        event.preventDefault();

        const value = Number(document.getElementById('budgetInput').value);
        if (value <= 0) {
            alert('Enter valid Budget');
            return;
        }

        const storageKey = getCurrentStorageKey();
        localStorage.setItem('budget', value);
        localStorage.setItem(`${storageKey}_budget`, value);

        if (useBackend && currentUserId) {
            try {
                const now = new Date();
                await BudgetService.createBudget(
                    currentUserId,
                    now.getMonth() + 1,
                    now.getFullYear(),
                    value
                );
                await loadBudgetFromBackend();
                alert('Budget saved successfully!');
            } catch (error) {
                console.error('Backend budget save failed:', error);
                alert('Failed to save budget: ' + error.message);
                return;
            }
        }

        if (typeof checkBudget === 'function') {
            checkBudget();
        }
        if (typeof displayBudget === 'function') {
            displayBudget();
        }
        if (typeof updateBudgetProgress === 'function') {
            updateBudgetProgress();
        }
    });
}

function wrapRecurringSave() {
    replaceButtonHandler('addRecurring', async function(event) {
        event.preventDefault();

        const name = document.getElementById('recurringName').value.trim();
        const amount = document.getElementById('recurringAmount').value;
        const type = document.getElementById('recurringType').value;
        const frequency = document.getElementById('recurringFrequency').value;

        if (!name || !amount) {
            alert('Please enter all details');
            return;
        }

        if (useBackend && currentUserId && currentAccountId) {
            try {
                const categoryType = type === 'income' ? 'income' : 'expense';
                const selectedCategory = await ensureCategory(currentUserId, name, categoryType);
                const categoryId = selectedCategory.categoryId || selectedCategory.id;

                await RecurringTransactionService.createRecurringTransaction(
                    currentUserId,
                    currentAccountId,
                    categoryId,
                    Number(amount),
                    normalizeFrequency(frequency),
                    calculateNextDueDate(frequency),
                    'ACTIVE'
                );

                document.getElementById('recurringName').value = '';
                document.getElementById('recurringAmount').value = '';
                await loadRecurringFromBackend();
                alert('Recurring transaction added!');
                return;
            } catch (error) {
                console.error('Backend recurring save failed:', error);
                alert('Failed to save recurring transaction: ' + error.message);
                return;
            }
        }

        if (typeof addRecurringTransaction === 'function') {
            addRecurringTransaction();
        }
    });
}

function wrapRecurringDelete() {
    const originalDeleteRecurring = window.deleteRecurring;

    if (typeof originalDeleteRecurring !== 'function') {
        return;
    }

    window.deleteRecurring = async function(recurringId) {
        if (useBackend && currentUserId) {
            try {
                await RecurringTransactionService.deleteRecurringTransaction(recurringId);
                await loadRecurringFromBackend();
                return;
            } catch (error) {
                console.warn('Backend recurring delete failed, falling back to local storage:', error);
            }
        }

        originalDeleteRecurring(recurringId);
    };
}

window.addEventListener('load', function() {
    setupLoginForm();
    attachLoginHandler();
    attachLogoutHandler();
    wrapTransactionSave();
    wrapGoalSave();
    wrapGoalDelete();
    wrapSavingsGoalUpdate();
    wrapBudgetSave();
    wrapRecurringSave();
    wrapRecurringDelete();

    const savedUserId = localStorage.getItem('currentUserId');
    const savedAccountId = localStorage.getItem('currentAccountId');
    if (savedUserId && savedAccountId) {
        currentUserId = Number(savedUserId);
        currentAccountId = Number(savedAccountId);
        updateDashboard(localStorage.getItem('currentUserEmail') || 'User', savedAccountId);
        loadTransactionsFromBackend();
    }
});
