package com.finance.finance_tracker_api.service.interfaces;

import com.finance.finance_tracker_api.dto.request.GoalRequest;
import com.finance.finance_tracker_api.dto.response.GoalResponse;

import java.util.List;

public interface GoalService {

    GoalResponse createGoal(GoalRequest request);

    List<GoalResponse> getAllGoals();

    GoalResponse getGoalById(Integer id);

    GoalResponse updateGoal(Integer id, GoalRequest request);

    void deleteGoal(Integer id);
}