
package com.finance.finance_tracker_api.service.interfaces;

import com.finance.finance_tracker_api.dto.request.TransactionRequest;
import com.finance.finance_tracker_api.dto.response.TransactionResponse;

import java.util.List;

public interface TransactionService {

    TransactionResponse createTransaction(TransactionRequest request);

    List<TransactionResponse> getAllTransactions();

    TransactionResponse getTransactionById(Integer id);

    TransactionResponse updateTransaction(Integer id, TransactionRequest request);

    void deleteTransaction(Integer id);
}