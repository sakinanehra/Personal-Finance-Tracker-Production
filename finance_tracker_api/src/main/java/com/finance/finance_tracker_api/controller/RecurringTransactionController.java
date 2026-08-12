package com.finance.finance_tracker_api.controller;

import com.finance.finance_tracker_api.dto.request.RecurringTransactionRequest;
import com.finance.finance_tracker_api.dto.response.RecurringTransactionResponse;
import com.finance.finance_tracker_api.service.interfaces.RecurringTransactionService;
import com.finance.finance_tracker_api.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/recurring_transactions")
@RequiredArgsConstructor
public class RecurringTransactionController {

    private final RecurringTransactionService recurringTransactionService;

    @PostMapping
    public ResponseEntity<ApiResponse<RecurringTransactionResponse>> createRecurringTransaction(
            @Valid @RequestBody RecurringTransactionRequest request) {

        RecurringTransactionResponse response =
                recurringTransactionService.createRecurringTransaction(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true,
                        "Recurring Transaction created successfully",
                        response,
                        LocalDateTime.now()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<RecurringTransactionResponse>>> getAllRecurringTransactions() {

        return ResponseEntity.ok(
                new ApiResponse<>(true,
                        "Recurring Transactions fetched successfully",
                        recurringTransactionService.getAllRecurringTransactions(),
                        LocalDateTime.now()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<RecurringTransactionResponse>> getRecurringTransactionById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                new ApiResponse<>(true,
                        "Recurring Transaction fetched successfully",
                        recurringTransactionService.getRecurringTransactionById(id),
                        LocalDateTime.now()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<RecurringTransactionResponse>> updateRecurringTransaction(
            @PathVariable Integer id,
            @Valid @RequestBody RecurringTransactionRequest request) {

        return ResponseEntity.ok(
                new ApiResponse<>(true,
                        "Recurring Transaction updated successfully",
                        recurringTransactionService.updateRecurringTransaction(id, request),
                        LocalDateTime.now()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteRecurringTransaction(@PathVariable Integer id) {

        recurringTransactionService.deleteRecurringTransaction(id);

        return ResponseEntity.ok(
                new ApiResponse<>(true,
                        "Recurring Transaction deleted successfully",
                        null,
                        LocalDateTime.now()));
    }
}