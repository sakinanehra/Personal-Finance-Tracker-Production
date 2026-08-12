
package com.finance.finance_tracker_api.service.interfaces;

import com.finance.finance_tracker_api.dto.request.GoalTransactionRequest;
import com.finance.finance_tracker_api.dto.response.GoalTransactionResponse;

import java.util.List;

public interface GoalTransactionService {

    GoalTransactionResponse createGoalTransaction(GoalTransactionRequest request);

    List<GoalTransactionResponse> getAllGoalTransactions();

    GoalTransactionResponse getGoalTransactionById(Integer id);

    GoalTransactionResponse updateGoalTransaction(Integer id, GoalTransactionRequest request);

    void deleteGoalTransaction(Integer id);
}