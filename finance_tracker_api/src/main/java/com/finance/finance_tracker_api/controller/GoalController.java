
package com.finance.finance_tracker_api.controller;

import com.finance.finance_tracker_api.dto.request.GoalRequest;
import com.finance.finance_tracker_api.dto.response.GoalResponse;
import com.finance.finance_tracker_api.service.interfaces.GoalService;
import com.finance.finance_tracker_api.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping
    public ResponseEntity<ApiResponse<GoalResponse>> createGoal(@Valid @RequestBody GoalRequest request) {

        GoalResponse response = goalService.createGoal(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(true, "Goal created successfully", response, LocalDateTime.now()));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<GoalResponse>>> getAllGoals() {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Goals fetched successfully",
                        goalService.getAllGoals(), LocalDateTime.now()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<GoalResponse>> getGoalById(@PathVariable Integer id) {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Goal fetched successfully",
                        goalService.getGoalById(id), LocalDateTime.now()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<GoalResponse>> updateGoal(
            @PathVariable Integer id,
            @Valid @RequestBody GoalRequest request) {

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Goal updated successfully",
                        goalService.updateGoal(id, request), LocalDateTime.now()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteGoal(@PathVariable Integer id) {

        goalService.deleteGoal(id);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Goal deleted successfully",
                        null, LocalDateTime.now()));
    }
}