
package com.finance.finance_tracker_api.controller;

import com.finance.finance_tracker_api.dto.request.TransactionRequest;
import com.finance.finance_tracker_api.dto.response.TransactionResponse;
import com.finance.finance_tracker_api.service.interfaces.TransactionService;
import com.finance.finance_tracker_api.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<ApiResponse<TransactionResponse>> createTransaction(
            @Valid @RequestBody TransactionRequest request) {

        TransactionResponse response = transactionService.createTransaction(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Transaction created successfully", response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<TransactionResponse>>> getAllTransactions() {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Transactions fetched successfully",
                        transactionService.getAllTransactions()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TransactionResponse>> getTransactionById(@PathVariable Integer id) {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Transaction fetched successfully",
                        transactionService.getTransactionById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<TransactionResponse>> updateTransaction(
            @PathVariable Integer id,
            @Valid @RequestBody TransactionRequest request) {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Transaction updated successfully",
                        transactionService.updateTransaction(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteTransaction(@PathVariable Integer id) {

        transactionService.deleteTransaction(id);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Transaction deleted successfully", null));
    }
}