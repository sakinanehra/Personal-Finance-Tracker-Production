package com.finance.finance_tracker_api.mapper;

import com.finance.finance_tracker_api.dto.response.RecurringTransactionResponse;
import com.finance.finance_tracker_api.entity.RecurringTransaction;

public class RecurringTransactionMapper {

    public static RecurringTransactionResponse toResponse(RecurringTransaction recurringTransaction) {

        return RecurringTransactionResponse.builder()
                .recurringId(recurringTransaction.getRecurringId())
                .userId(recurringTransaction.getUser().getUserId())
                .userName(recurringTransaction.getUser().getFullName())
                .accountId(recurringTransaction.getAccount().getAccountId())
                .accountName(recurringTransaction.getAccount().getAccountName())
                .categoryId(recurringTransaction.getCategory().getCategoryId())
                .categoryName(recurringTransaction.getCategory().getCategoryName())
                .amount(recurringTransaction.getAmount())
                .frequency(recurringTransaction.getFrequency().name())
                .nextDueDate(recurringTransaction.getNextDueDate())
                .status(recurringTransaction.getStatus().name())
                .createdAt(recurringTransaction.getCreatedAt())
                .updatedAt(recurringTransaction.getUpdatedAt())
                .build();
    }
}