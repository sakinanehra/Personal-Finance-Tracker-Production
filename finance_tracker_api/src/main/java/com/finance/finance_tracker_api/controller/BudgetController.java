
package com.finance.finance_tracker_api.controller;

import com.finance.finance_tracker_api.dto.request.BudgetRequest;
import com.finance.finance_tracker_api.dto.response.BudgetResponse;
import com.finance.finance_tracker_api.service.interfaces.BudgetService;
import com.finance.finance_tracker_api.util.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;


@RestController
@RequestMapping("/api/v1/budgets")
@RequiredArgsConstructor
public class BudgetController {


    private final BudgetService budgetService;


    @PostMapping
    public ResponseEntity<ApiResponse<BudgetResponse>> createBudget(
            @Valid @RequestBody BudgetRequest request) {


        BudgetResponse response = budgetService.createBudget(request);


        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Budget created successfully",
                        response,
                        LocalDateTime.now()
                ));
    }



    @GetMapping
    public ResponseEntity<ApiResponse<List<BudgetResponse>>> getAllBudgets() {


        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Budgets fetched successfully",
                        budgetService.getAllBudgets(),
                        LocalDateTime.now()
                )
        );
    }



    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BudgetResponse>> getBudgetById(
            @PathVariable Integer id) {


        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Budget fetched successfully",
                        budgetService.getBudgetById(id),
                        LocalDateTime.now()
                )
        );
    }



    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<BudgetResponse>> updateBudget(
            @PathVariable Integer id,
            @Valid @RequestBody BudgetRequest request) {


        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Budget updated successfully",
                        budgetService.updateBudget(id, request),
                        LocalDateTime.now()
                )
        );
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteBudget(
            @PathVariable Integer id) {


        budgetService.deleteBudget(id);


        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Budget deleted successfully",
                        null,
                        LocalDateTime.now()
                )
        );
    }
}