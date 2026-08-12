
package com.finance.finance_tracker_api.controller;

import com.finance.finance_tracker_api.dto.request.GoalTransactionRequest;
import com.finance.finance_tracker_api.dto.response.GoalTransactionResponse;
import com.finance.finance_tracker_api.service.interfaces.GoalTransactionService;
import com.finance.finance_tracker_api.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/goal_transactions")
@RequiredArgsConstructor
public class GoalTransactionController {

    private final GoalTransactionService goalTransactionService;

    @PostMapping
    public ResponseEntity<ApiResponse<GoalTransactionResponse>> createGoalTransaction(
            @Valid @RequestBody GoalTransactionRequest request) {

        GoalTransactionResponse response = goalTransactionService.createGoalTransaction(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<GoalTransactionResponse>builder()
                        .success(true)
                        .message("Goal transaction created successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GoalTransactionResponse>>> getAllGoalTransactions() {

        return ResponseEntity.ok(
                ApiResponse.<List<GoalTransactionResponse>>builder()
                        .success(true)
                        .message("Goal transactions fetched successfully")
                        .data(goalTransactionService.getAllGoalTransactions())
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GoalTransactionResponse>> getGoalTransactionById(@PathVariable Integer id) {

        return ResponseEntity.ok(
                ApiResponse.<GoalTransactionResponse>builder()
                        .success(true)
                        .message("Goal transaction fetched successfully")
                        .data(goalTransactionService.getGoalTransactionById(id))
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GoalTransactionResponse>> updateGoalTransaction(
            @PathVariable Integer id,
            @Valid @RequestBody GoalTransactionRequest request) {

        return ResponseEntity.ok(
                ApiResponse.<GoalTransactionResponse>builder()
                        .success(true)
                        .message("Goal transaction updated successfully")
                        .data(goalTransactionService.updateGoalTransaction(id, request))
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteGoalTransaction(@PathVariable Integer id) {

        goalTransactionService.deleteGoalTransaction(id);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Goal transaction deleted successfully")
                        .data(null)
                        .timestamp(LocalDateTime.now())
                        .build());
    }
}