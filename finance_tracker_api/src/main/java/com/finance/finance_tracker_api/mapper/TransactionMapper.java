package com.finance.finance_tracker_api.mapper;

import com.finance.finance_tracker_api.dto.response.TransactionResponse;
import com.finance.finance_tracker_api.entity.Transaction;

public class TransactionMapper {

    public static TransactionResponse toResponse(Transaction transaction){

        return TransactionResponse.builder()
                .transactionId(transaction.getTransactionId())
                .userId(transaction.getUser().getUserId())
                .userName(transaction.getUser().getFullName())
                .accountId(transaction.getAccount().getAccountId())
                .accountName(transaction.getAccount().getAccountName())
                .categoryId(transaction.getCategory().getCategoryId())
                .categoryName(transaction.getCategory().getCategoryName())
                .amount(transaction.getAmount())
                .transactionType(transaction.getTransactionType().name())
                .description(transaction.getDescription())
                .transactionDate(transaction.getTransactionDate())
                .build();
    }

}