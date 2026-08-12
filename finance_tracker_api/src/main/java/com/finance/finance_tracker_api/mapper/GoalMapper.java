package com.finance.finance_tracker_api.mapper;

import com.finance.finance_tracker_api.dto.response.GoalResponse;
import com.finance.finance_tracker_api.entity.Goal;
import com.finance.finance_tracker_api.entity.User;

import java.time.LocalDateTime;

public class GoalMapper {

    public static Goal toEntity(Goal goal, User user) {

        return Goal.builder()
                .user(user)
                .goalName(goal.getGoalName())
                .targetAmount(goal.getTargetAmount())
                .currentAmount(goal.getCurrentAmount())
                .deadline(goal.getDeadline())
                .status(goal.getStatus())
                .createdAt(LocalDateTime.now())
                .build();
    }

    public static GoalResponse toResponse(Goal goal) {

        return GoalResponse.builder()
                .goalId(goal.getGoalId())
                .userId(goal.getUser().getUserId())
                .userName(goal.getUser().getFullName())
                .goalName(goal.getGoalName())
                .targetAmount(goal.getTargetAmount())
                .currentAmount(goal.getCurrentAmount())
                .deadline(goal.getDeadline())
                .status(goal.getStatus().name())
                .createdAt(goal.getCreatedAt())
                .build();
    }
} 