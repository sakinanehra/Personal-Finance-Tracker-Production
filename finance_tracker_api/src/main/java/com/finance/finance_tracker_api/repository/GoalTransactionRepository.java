package com.finance.finance_tracker_api.repository;

import com.finance.finance_tracker_api.entity.GoalTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalTransactionRepository extends JpaRepository<GoalTransaction, Integer> {
}