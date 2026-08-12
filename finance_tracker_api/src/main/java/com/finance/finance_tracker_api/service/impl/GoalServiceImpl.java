package com.finance.finance_tracker_api.service.impl;

import com.finance.finance_tracker_api.dto.request.GoalRequest;
import com.finance.finance_tracker_api.dto.response.GoalResponse;
import com.finance.finance_tracker_api.entity.Goal;
import com.finance.finance_tracker_api.entity.GoalStatus;
import com.finance.finance_tracker_api.entity.User;
import com.finance.finance_tracker_api.mapper.GoalMapper;
import com.finance.finance_tracker_api.repository.GoalRepository;
import com.finance.finance_tracker_api.repository.UserRepository;
import com.finance.finance_tracker_api.service.interfaces.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalServiceImpl implements GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    @Override
    public GoalResponse createGoal(GoalRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Goal goal = Goal.builder()
                .user(user)
                .goalName(request.getGoalName())
                .targetAmount(request.getTargetAmount())
                .currentAmount(request.getCurrentAmount() != null ? request.getCurrentAmount() : java.math.BigDecimal.ZERO)
                .deadline(request.getDeadline())
                .status(request.getStatus() != null ? GoalStatus.valueOf(request.getStatus()) : GoalStatus.ACTIVE)
                .createdAt(LocalDateTime.now())
                .build();

        return GoalMapper.toResponse(goalRepository.save(goal));
    }

    @Override
    public List<GoalResponse> getAllGoals() {

        return goalRepository.findAll()
                .stream()
                .map(GoalMapper::toResponse)
                .toList();
    }

    @Override
    public GoalResponse getGoalById(Integer id) {

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        return GoalMapper.toResponse(goal);
    }

    @Override
    public GoalResponse updateGoal(Integer id, GoalRequest request) {

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        goal.setUser(user);
        goal.setGoalName(request.getGoalName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setCurrentAmount(request.getCurrentAmount() != null ? request.getCurrentAmount() : java.math.BigDecimal.ZERO);
        goal.setDeadline(request.getDeadline());
        goal.setStatus(request.getStatus() != null ? GoalStatus.valueOf(request.getStatus()) : GoalStatus.ACTIVE);

        return GoalMapper.toResponse(goalRepository.save(goal));
    }

    @Override
    public void deleteGoal(Integer id) {

        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        goalRepository.delete(goal);
    }
}