package com.finance.finance_tracker_api.repository;

import com.finance.finance_tracker_api.entity.RecurringTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecurringTransactionRepository extends JpaRepository<RecurringTransaction, Integer> {

}