package com.finance.finance_tracker_api.service.impl;

import com.finance.finance_tracker_api.dto.request.RecurringTransactionRequest;
import com.finance.finance_tracker_api.dto.response.RecurringTransactionResponse;
import com.finance.finance_tracker_api.entity.*;
import com.finance.finance_tracker_api.mapper.RecurringTransactionMapper;
import com.finance.finance_tracker_api.repository.*;
import com.finance.finance_tracker_api.service.interfaces.RecurringTransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecurringTransactionServiceImpl implements RecurringTransactionService {

    private final RecurringTransactionRepository recurringRepository;
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public RecurringTransactionResponse createRecurringTransaction(RecurringTransactionRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        RecurringTransaction recurring = RecurringTransaction.builder()
                .user(user)
                .account(account)
                .category(category)
                .amount(request.getAmount())
                .frequency(Frequency.valueOf(request.getFrequency().trim().toUpperCase()))
                .nextDueDate(request.getNextDueDate())
                .status(request.getStatus() == null
                        ? RecurringStatus.ACTIVE
                        : RecurringStatus.valueOf(request.getStatus().trim().toUpperCase()))
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return RecurringTransactionMapper.toResponse(recurringRepository.save(recurring));
    }

    @Override
    public List<RecurringTransactionResponse> getAllRecurringTransactions() {

        return recurringRepository.findAll()
                .stream()
                .map(RecurringTransactionMapper::toResponse)
                .toList();
    }

    @Override
    public RecurringTransactionResponse getRecurringTransactionById(Integer id) {

        RecurringTransaction recurring = recurringRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recurring Transaction not found"));

        return RecurringTransactionMapper.toResponse(recurring);
    }

    @Override
    public RecurringTransactionResponse updateRecurringTransaction(Integer id, RecurringTransactionRequest request) {

        RecurringTransaction recurring = recurringRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recurring Transaction not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        recurring.setUser(user);
        recurring.setAccount(account);
        recurring.setCategory(category);
        recurring.setAmount(request.getAmount());
        recurring.setFrequency(Frequency.valueOf(request.getFrequency().trim().toUpperCase()));
        recurring.setNextDueDate(request.getNextDueDate());
        recurring.setStatus(request.getStatus() == null
                ? RecurringStatus.ACTIVE
                : RecurringStatus.valueOf(request.getStatus().trim().toUpperCase()));
        recurring.setUpdatedAt(LocalDateTime.now());

        return RecurringTransactionMapper.toResponse(recurringRepository.save(recurring));
    }

    @Override
    public void deleteRecurringTransaction(Integer id) {

        RecurringTransaction recurring = recurringRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recurring Transaction not found"));

        recurringRepository.delete(recurring);
    }
}