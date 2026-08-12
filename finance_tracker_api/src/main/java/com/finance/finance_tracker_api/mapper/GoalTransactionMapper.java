package com.finance.finance_tracker_api.mapper;

import com.finance.finance_tracker_api.dto.response.GoalTransactionResponse;
import com.finance.finance_tracker_api.entity.GoalTransaction;

public class GoalTransactionMapper {

    public static GoalTransactionResponse toResponse(GoalTransaction goalTransaction) {

        return GoalTransactionResponse.builder()
                .goalTransactionId(goalTransaction.getGoalTransactionId())
                .goalId(goalTransaction.getGoal().getGoalId())
                .goalName(goalTransaction.getGoal().getGoalName())
                .transactionId(goalTransaction.getTransaction().getTransactionId())
                .transactionAmount(goalTransaction.getTransaction().getAmount())
                .amountUsed(goalTransaction.getAmountUsed())
                .createdAt(goalTransaction.getCreatedAt())
                .build();
    }
}