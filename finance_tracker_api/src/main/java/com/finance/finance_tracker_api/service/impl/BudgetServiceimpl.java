
package com.finance.finance_tracker_api.service.impl;

import com.finance.finance_tracker_api.dto.request.BudgetRequest;
import com.finance.finance_tracker_api.dto.response.BudgetResponse;
import com.finance.finance_tracker_api.entity.Budget;
import com.finance.finance_tracker_api.entity.User;
import com.finance.finance_tracker_api.mapper.BudgetMapper;
import com.finance.finance_tracker_api.repository.BudgetRepository;
import com.finance.finance_tracker_api.repository.UserRepository;
import com.finance.finance_tracker_api.service.interfaces.BudgetService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetServiceimpl implements BudgetService {


    private final BudgetRepository budgetRepository;

    private final UserRepository userRepository;


    @Override
    public BudgetResponse createBudget(BudgetRequest request) {


        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));


        Budget budget = budgetRepository
                .findByUserUserIdAndBudgetMonthAndBudgetYear(
                        request.getUserId(),
                        request.getBudgetMonth(),
                        request.getBudgetYear())
                .orElse(Budget.builder()
                        .user(user)
                        .budgetMonth(request.getBudgetMonth())
                        .budgetYear(request.getBudgetYear())
                        .createdAt(LocalDateTime.now())
                        .build());


        budget.setBudgetAmount(request.getBudgetAmount());


        return BudgetMapper.toResponse(
                budgetRepository.save(budget)
        );
    }


    @Override
    public List<BudgetResponse> getAllBudgets() {

        return budgetRepository.findAll()
                .stream()
                .map(BudgetMapper::toResponse)
                .toList();
    }


    @Override
    public BudgetResponse getBudgetById(Integer id) {

        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        return BudgetMapper.toResponse(budget);
    }


    @Override
    public BudgetResponse updateBudget(Integer id, BudgetRequest request) {


        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));


        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));


        budget.setUser(user);
        budget.setBudgetMonth(request.getBudgetMonth());
        budget.setBudgetYear(request.getBudgetYear());
        budget.setBudgetAmount(request.getBudgetAmount());


        return BudgetMapper.toResponse(
                budgetRepository.save(budget)
        );
    }


    @Override
    public void deleteBudget(Integer id) {

        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));

        budgetRepository.delete(budget);
    }
}
