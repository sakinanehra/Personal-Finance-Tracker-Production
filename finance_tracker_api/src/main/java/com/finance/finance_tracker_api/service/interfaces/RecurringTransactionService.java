package com.finance.finance_tracker_api.service.interfaces;

import com.finance.finance_tracker_api.dto.request.RecurringTransactionRequest;
import com.finance.finance_tracker_api.dto.response.RecurringTransactionResponse;

import java.util.List;

public interface RecurringTransactionService {

    RecurringTransactionResponse createRecurringTransaction(RecurringTransactionRequest request);

    List<RecurringTransactionResponse> getAllRecurringTransactions();

    RecurringTransactionResponse getRecurringTransactionById(Integer id);

    RecurringTransactionResponse updateRecurringTransaction(Integer id, RecurringTransactionRequest request);

    void deleteRecurringTransaction(Integer id);
}