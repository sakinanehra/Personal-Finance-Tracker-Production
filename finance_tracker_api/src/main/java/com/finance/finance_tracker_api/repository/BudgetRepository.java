package com.finance.finance_tracker_api.repository;

import com.finance.finance_tracker_api.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Integer> {

    Optional<Budget> findByUserUserIdAndBudgetMonthAndBudgetYear(
            Integer userId, Integer budgetMonth, Integer budgetYear);
}
