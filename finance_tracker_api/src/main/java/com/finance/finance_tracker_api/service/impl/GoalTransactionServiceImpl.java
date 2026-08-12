
package com.finance.finance_tracker_api.service.impl;

import com.finance.finance_tracker_api.dto.request.GoalTransactionRequest;
import com.finance.finance_tracker_api.dto.response.GoalTransactionResponse;
import com.finance.finance_tracker_api.entity.Goal;
import com.finance.finance_tracker_api.entity.GoalStatus;
import com.finance.finance_tracker_api.entity.GoalTransaction;
import com.finance.finance_tracker_api.entity.Transaction;
import com.finance.finance_tracker_api.mapper.GoalTransactionMapper;
import com.finance.finance_tracker_api.repository.GoalRepository;
import com.finance.finance_tracker_api.repository.GoalTransactionRepository;
import com.finance.finance_tracker_api.repository.TransactionRepository;
import com.finance.finance_tracker_api.service.interfaces.GoalTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalTransactionServiceImpl implements GoalTransactionService {

    private final GoalTransactionRepository goalTransactionRepository;
    private final GoalRepository goalRepository;
    private final TransactionRepository transactionRepository;

    @Override
    @Transactional
    public GoalTransactionResponse createGoalTransaction(GoalTransactionRequest request) {

        Goal goal = goalRepository.findById(request.getGoalId())
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        Transaction transaction = transactionRepository.findById(request.getTransactionId())
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        GoalTransaction goalTransaction = GoalTransaction.builder()
                .goal(goal)
                .transaction(transaction)
                .amountUsed(request.getAmountUsed())
                .createdAt(LocalDateTime.now())
                .build();

        GoalTransaction saved = goalTransactionRepository.save(goalTransaction);
        updateGoalProgress(goal, request.getAmountUsed());

        return GoalTransactionMapper.toResponse(saved);
    }

    @Override
    public List<GoalTransactionResponse> getAllGoalTransactions() {

        return goalTransactionRepository.findAll()
                .stream()
                .map(GoalTransactionMapper::toResponse)
                .toList();
    }

    @Override
    public GoalTransactionResponse getGoalTransactionById(Integer id) {

        GoalTransaction goalTransaction = goalTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal Transaction not found"));

        return GoalTransactionMapper.toResponse(goalTransaction);
    }

    @Override
    public GoalTransactionResponse updateGoalTransaction(Integer id, GoalTransactionRequest request) {

        GoalTransaction goalTransaction = goalTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal Transaction not found"));

        Goal goal = goalRepository.findById(request.getGoalId())
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        Transaction transaction = transactionRepository.findById(request.getTransactionId())
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        goalTransaction.setGoal(goal);
        goalTransaction.setTransaction(transaction);
        goalTransaction.setAmountUsed(request.getAmountUsed());

        return GoalTransactionMapper.toResponse(goalTransactionRepository.save(goalTransaction));
    }

    @Override
    public void deleteGoalTransaction(Integer id) {

        GoalTransaction goalTransaction = goalTransactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal Transaction not found"));

        goalTransactionRepository.delete(goalTransaction);
    }

    private void updateGoalProgress(Goal goal, BigDecimal amountUsed) {
        BigDecimal currentAmount = goal.getCurrentAmount() != null ? goal.getCurrentAmount() : BigDecimal.ZERO;
        BigDecimal updatedAmount = currentAmount.add(amountUsed);
        goal.setCurrentAmount(updatedAmount);

        if (updatedAmount.compareTo(goal.getTargetAmount()) >= 0) {
            goal.setStatus(GoalStatus.COMPLETED);
        }

        goalRepository.save(goal);
    }
}