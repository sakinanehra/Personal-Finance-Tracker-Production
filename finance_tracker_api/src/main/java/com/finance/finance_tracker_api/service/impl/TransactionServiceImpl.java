
package com.finance.finance_tracker_api.service.impl;

import com.finance.finance_tracker_api.dto.request.TransactionRequest;
import com.finance.finance_tracker_api.dto.response.TransactionResponse;
import com.finance.finance_tracker_api.entity.*;
import com.finance.finance_tracker_api.mapper.TransactionMapper;
import com.finance.finance_tracker_api.repository.*;
import com.finance.finance_tracker_api.service.interfaces.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @Transactional
    public TransactionResponse createTransaction(TransactionRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        TransactionType transactionType = TransactionType.valueOf(request.getTransactionType());

        Transaction transaction = Transaction.builder()
                .user(user)
                .account(account)
                .category(category)
                .amount(request.getAmount())
                .transactionType(transactionType)
                .description(request.getDescription())
                .transactionDate(LocalDateTime.now())
                .build();

        Transaction saved = transactionRepository.save(transaction);
        applyBalanceChange(account, transactionType, request.getAmount(), false);
        accountRepository.save(account);

        return TransactionMapper.toResponse(saved);
    }

    @Override
    public List<TransactionResponse> getAllTransactions() {
        return transactionRepository.findAll()
                .stream()
                .map(TransactionMapper::toResponse)
                .toList();
    }

    @Override
    public TransactionResponse getTransactionById(Integer id) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        return TransactionMapper.toResponse(transaction);
    }

    @Override
    @Transactional
    public TransactionResponse updateTransaction(Integer id, TransactionRequest request) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Account previousAccount = transaction.getAccount();
        TransactionType previousType = transaction.getTransactionType();
        BigDecimal previousAmount = transaction.getAmount();

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        TransactionType transactionType = TransactionType.valueOf(request.getTransactionType());

        applyBalanceChange(previousAccount, previousType, previousAmount, true);
        accountRepository.save(previousAccount);

        transaction.setUser(user);
        transaction.setAccount(account);
        transaction.setCategory(category);
        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(transactionType);
        transaction.setDescription(request.getDescription());

        Transaction saved = transactionRepository.save(transaction);
        applyBalanceChange(account, transactionType, request.getAmount(), false);
        accountRepository.save(account);

        return TransactionMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteTransaction(Integer id) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Account account = transaction.getAccount();
        applyBalanceChange(account, transaction.getTransactionType(), transaction.getAmount(), true);
        accountRepository.save(account);

        transactionRepository.delete(transaction);
    }

    private void applyBalanceChange(Account account, TransactionType type, BigDecimal amount, boolean reverse) {
        BigDecimal balance = account.getCurrentBalance() != null ? account.getCurrentBalance() : BigDecimal.ZERO;

        if (type == TransactionType.income) {
            account.setCurrentBalance(reverse ? balance.subtract(amount) : balance.add(amount));
            return;
        }

        account.setCurrentBalance(reverse ? balance.add(amount) : balance.subtract(amount));
    }
}