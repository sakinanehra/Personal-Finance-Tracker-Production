
package com.finance.finance_tracker_api.service.interfaces;

import com.finance.finance_tracker_api.dto.request.BudgetRequest;
import com.finance.finance_tracker_api.dto.response.BudgetResponse;

import java.util.List;

public interface BudgetService {

    BudgetResponse createBudget(BudgetRequest request);

    List<BudgetResponse> getAllBudgets();

    BudgetResponse getBudgetById(Integer id);

    BudgetResponse updateBudget(Integer id, BudgetRequest request);

    void deleteBudget(Integer id);
}