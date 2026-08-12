/**
 * API Service Layer - CORRECTED
 * Handles all communication between frontend and backend
 * Backend URL: http://localhost:8081/api/v1
 * 
 * FIXES APPLIED:
 * - All DTOs match backend contracts exactly
 * - All endpoints verified against backend controllers
 * - All response mappings use correct field names
 * - Proper error handling with status codes
 */

const API_BASE_URL = 'http://localhost:8081/api/v1';

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Make API request with proper error handling
 */
async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const responseData = await response.json();
        
        if (!response.ok) {
            console.error(`API Error ${response.status}:`, responseData);
            throw new Error(responseData.message || `API Error: ${response.status}`);
        }
        
        return responseData;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}

// ============================================
// USER MANAGEMENT APIs
// ============================================

class UserService {
    /**
     * Create new user
     * DTO: {fullName, email, password}
     * Response: {userId, fullName, email, createdAt, updatedAt}
     */
    static async createUser(fullName, email, password) {
        try {
            const response = await apiRequest('/users', 'POST', {
                fullName: fullName,
                email: email,
                password: password
            });
            
            // Backend returns ApiResponse wrapper
            if (response.success && response.data) {
                return {
                    success: true,
                    data: {
                        userId: response.data.userId,
                        fullName: response.data.fullName,
                        email: response.data.email,
                        createdAt: response.data.createdAt,
                        updatedAt: response.data.updatedAt
                    }
                };
            }
            return response;
        } catch (error) {
            console.error('User creation failed:', error);
            throw error;
        }
    }

    static async getAllUsers() {
        return apiRequest('/users', 'GET');
    }

    static async getUserById(userId) {
        return apiRequest(`/users/${userId}`, 'GET');
    }

    static async updateUser(userId, userData) {
        return apiRequest(`/users/${userId}`, 'PUT', userData);
    }

    static async deleteUser(userId) {
        return apiRequest(`/users/${userId}`, 'DELETE');
    }
}

// ============================================
// ACCOUNT MANAGEMENT APIs
// ============================================

class AccountService {
    /**
     * Create new account
     * DTO: {userId, accountName, accountType, currentBalance}
     * Response: {accountId, userId, accountName, accountType, currentBalance, createdAt}
     */
    static async createAccount(userId, accountName, accountType = 'BANK', currentBalance = 0) {
    try {

        const payload = {
            userId: userId,
            accountName: accountName,
            accountType: accountType,
            currentBalance: currentBalance
        };

        console.log("Account Payload:", payload);

        const response = await apiRequest('/accounts', 'POST', payload);

        return response;

    } catch (error) {
        console.error("Account creation failed:", error);
        throw error;
    }
}

    /**
     * Get all accounts (then filter by userId on frontend)
     * Backend does NOT have /accounts/user/{userId} endpoint
     */
    static async getAllAccounts() {
        try {
            const response = await apiRequest('/accounts', 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get accounts:', error);
            throw error;
        }
    }

    /**
     * Get account by ID
     */
    static async getAccountById(accountId) {
        try {
            const response = await apiRequest(`/accounts/${accountId}`, 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get account:', error);
            throw error;
        }
    }

    /**
     * Update account
     */
    static async updateAccount(accountId, accountData) {
        try {
            const response = await apiRequest(`/accounts/${accountId}`, 'PUT', accountData);
            return response;
        } catch (error) {
            console.error('Failed to update account:', error);
            throw error;
        }
    }

    /**
     * Delete account
     */
    static async deleteAccount(accountId) {
        try {
            const response = await apiRequest(`/accounts/${accountId}`, 'DELETE');
            return response;
        } catch (error) {
            console.error('Failed to delete account:', error);
            throw error;
        }
    }
}

// ============================================
// TRANSACTION MANAGEMENT APIs
// ============================================

class TransactionService {
    /**
     * Create transaction
     * DTO: {userId, accountId, categoryId, amount, transactionType, description}
     * Response: {transactionId, userId, accountId, categoryId, categoryName, amount, transactionType, description, transactionDate}
     */
    static async createTransaction(userId, accountId, categoryId, amount, transactionType, description = '') {
        try {
            const response = await apiRequest('/transactions', 'POST', {
                userId: userId,
                accountId: accountId,
                categoryId: categoryId,
                amount: amount,
                transactionType: transactionType,
                description: description
            });
            
            if (response.success && response.data) {
                return {
                    success: true,
                    data: {
                        transactionId: response.data.transactionId,
                        userId: response.data.userId,
                        accountId: response.data.accountId,
                        categoryId: response.data.categoryId,
                        categoryName: response.data.categoryName,
                        amount: response.data.amount,
                        transactionType: response.data.transactionType,
                        description: response.data.description,
                        transactionDate: response.data.transactionDate
                    }
                };
            }
            return response;
        } catch (error) {
            console.error('Transaction creation failed:', error);
            throw error;
        }
    }
     static async getCategoriesByUser(userId) {
    return apiRequest(`/categories/user/${userId}`, "GET");
}
    /**
     * Get all transactions (then filter by accountId on frontend)
     * Backend does NOT have /transactions/account/{accountId} endpoint
     */
    static async getAllTransactions() {
        try {
            const response = await apiRequest('/transactions', 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get transactions:', error);
            throw error;
        }
    }

    /**
     * Get transaction by ID
     */
    static async getTransactionById(transactionId) {
        try {
            const response = await apiRequest(`/transactions/${transactionId}`, 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get transaction:', error);
            throw error;
        }
    }

    /**
     * Update transaction
     */
    static async updateTransaction(transactionId, transactionData) {
        try {
            const response = await apiRequest(`/transactions/${transactionId}`, 'PUT', transactionData);
            return response;
        } catch (error) {
            console.error('Failed to update transaction:', error);
            throw error;
        }
    }

    /**
     * Delete transaction
     */
    static async deleteTransaction(transactionId) {
        try {
            const response = await apiRequest(`/transactions/${transactionId}`, 'DELETE');
            return response;
        } catch (error) {
            console.error('Failed to delete transaction:', error);
            throw error;
        }
    }
}

// ============================================
// CATEGORY MANAGEMENT APIs
// ============================================

class CategoryService {
    /**
     * Create category
     * DTO: {categoryName, categoryType}
     */
    static async getCategoriesByUser(userId) {
    return await apiRequest(`/categories/user/${userId}`, "GET");
}
    static async createCategory(userId, categoryName, categoryType) {
        try {
            const response = await apiRequest('/categories', 'POST', {
                userId: userId,
                categoryName: categoryName,
                type: categoryType
            });
            return response;
        } catch (error) {
            console.error('Category creation failed:', error);
            throw error;
        }
    }

    /**
     * Get all categories
     */
    static async getAllCategories() {
        try {
            const response = await apiRequest('/categories', 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get categories:', error);
            throw error;
        }
    }

    /**
     * Get category by ID
     */
    static async getCategoryById(categoryId) {
        try {
            const response = await apiRequest(`/categories/${categoryId}`, 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get category:', error);
            throw error;
        }
    }

    /**
     * Update category
     */
    static async updateCategory(categoryId, categoryData) {
        try {
            const response = await apiRequest(`/categories/${categoryId}`, 'PUT', categoryData);
            return response;
        } catch (error) {
            console.error('Failed to update category:', error);
            throw error;
        }
    }

    /**
     * Delete category
     */
    static async deleteCategory(categoryId) {
        try {
            const response = await apiRequest(`/categories/${categoryId}`, 'DELETE');
            return response;
        } catch (error) {
            console.error('Failed to delete category:', error);
            throw error;
        }
    }
}

// ============================================
// BUDGET MANAGEMENT APIs
// ============================================

class BudgetService {
    /**
     * Create budget
     * DTO: {userId, budgetMonth, budgetYear, budgetAmount}
     */
    static async createBudget(userId, budgetMonth, budgetYear, budgetAmount) {
        try {
            const response = await apiRequest('/budgets', 'POST', {
                userId: userId,
                budgetMonth: budgetMonth,
                budgetYear: budgetYear,
                budgetAmount: budgetAmount
            });
            return response;
        } catch (error) {
            console.error('Budget creation failed:', error);
            throw error;
        }
    }

    /**
     * Get all budgets
     */
    static async getAllBudgets() {
        try {
            const response = await apiRequest('/budgets', 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get budgets:', error);
            throw error;
        }
    }

    /**
     * Get budget by ID
     */
    static async getBudgetById(budgetId) {
        try {
            const response = await apiRequest(`/budgets/${budgetId}`, 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get budget:', error);
            throw error;
        }
    }

    /**
     * Update budget
     */
    static async updateBudget(budgetId, budgetData) {
        try {
            const response = await apiRequest(`/budgets/${budgetId}`, 'PUT', budgetData);
            return response;
        } catch (error) {
            console.error('Failed to update budget:', error);
            throw error;
        }
    }

    /**
     * Delete budget
     */
    static async deleteBudget(budgetId) {
        try {
            const response = await apiRequest(`/budgets/${budgetId}`, 'DELETE');
            return response;
        } catch (error) {
            console.error('Failed to delete budget:', error);
            throw error;
        }
    }
}

// ============================================
// GOAL MANAGEMENT APIs
// ============================================

class GoalService {
    /**
     * Create goal
     * DTO: {userId, goalName, targetAmount, currentAmount, deadline, status}
     */
    static async createGoal(userId, goalName, targetAmount, currentAmount = 0, deadline = null, status = 'ACTIVE') {
        try {
            const response = await apiRequest('/goals', 'POST', {
                userId: userId,
                goalName: goalName,
                targetAmount: targetAmount,
                currentAmount: currentAmount,
                deadline: deadline,
                status: status
            });
            return response;
        } catch (error) {
            console.error('Goal creation failed:', error);
            throw error;
        }
    }

    /**
     * Get all goals
     */
    static async getAllGoals() {
        try {
            const response = await apiRequest('/goals', 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get goals:', error);
            throw error;
        }
    }

    /**
     * Get goal by ID
     */
    static async getGoalById(goalId) {
        try {
            const response = await apiRequest(`/goals/${goalId}`, 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get goal:', error);
            throw error;
        }
    }

    /**
     * Update goal
     */
    static async updateGoal(goalId, goalData) {
        try {
            const response = await apiRequest(`/goals/${goalId}`, 'PUT', goalData);
            return response;
        } catch (error) {
            console.error('Failed to update goal:', error);
            throw error;
        }
    }

    /**
     * Delete goal
     */
    static async deleteGoal(goalId) {
        try {
            const response = await apiRequest(`/goals/${goalId}`, 'DELETE');
            return response;
        } catch (error) {
            console.error('Failed to delete goal:', error);
            throw error;
        }
    }
}

// ============================================
// GOAL TRANSACTION MANAGEMENT APIs
// ============================================

class GoalTransactionService {
    static async createGoalTransaction(goalId, transactionId, amountUsed) {
        try {
            const response = await apiRequest('/goal_transactions', 'POST', {
                goalId: goalId,
                transactionId: transactionId,
                amountUsed: amountUsed
            });
            return response;
        } catch (error) {
            console.error('Goal transaction creation failed:', error);
            throw error;
        }
    }

    static async getAllGoalTransactions() {
        try {
            const response = await apiRequest('/goal_transactions', 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get goal transactions:', error);
            throw error;
        }
    }
}

// ============================================
// RECURRING TRANSACTION MANAGEMENT APIs
// ============================================

class RecurringTransactionService {
    /**
     * Create recurring transaction
     * Note: Backend uses /recurring_transactions (underscore, not hyphen)
     * DTO: {userId, accountId, categoryId, amount, frequency, nextDueDate, status}
     */
    static async createRecurringTransaction(userId, accountId, categoryId, amount, frequency, nextDueDate = null, status = 'ACTIVE') {
        try {
            const response = await apiRequest('/recurring_transactions', 'POST', {
                userId: userId,
                accountId: accountId,
                categoryId: categoryId,
                amount: amount,
                frequency: frequency,
                nextDueDate: nextDueDate,
                status: status
            });
            return response;
        } catch (error) {
            console.error('Recurring transaction creation failed:', error);
            throw error;
        }
    }

    /**
     * Get all recurring transactions
     */
    static async getAllRecurringTransactions() {
        try {
            const response = await apiRequest('/recurring_transactions', 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get recurring transactions:', error);
            throw error;
        }
    }

    /**
     * Get recurring transaction by ID
     */
    static async getRecurringTransactionById(recurringTransactionId) {
        try {
            const response = await apiRequest(`/recurring_transactions/${recurringTransactionId}`, 'GET');
            return response;
        } catch (error) {
            console.error('Failed to get recurring transaction:', error);
            throw error;
        }
    }

    /**
     * Update recurring transaction
     */
    static async updateRecurringTransaction(recurringTransactionId, transactionData) {
        try {
            const response = await apiRequest(`/recurring_transactions/${recurringTransactionId}`, 'PUT', transactionData);
            return response;
        } catch (error) {
            console.error('Failed to update recurring transaction:', error);
            throw error;
        }
    }

    /**
     * Delete recurring transaction
     */
    static async deleteRecurringTransaction(recurringTransactionId) {
        try {
            const response = await apiRequest(`/recurring_transactions/${recurringTransactionId}`, 'DELETE');
            return response;
        } catch (error) {
            console.error('Failed to delete recurring transaction:', error);
            throw error;
        }
    }
}

// ============================================
// API SERVICE INITIALIZATION
// ============================================

console.log('✅ API Service Layer Loaded Successfully');
console.log('Backend URL:', API_BASE_URL);
