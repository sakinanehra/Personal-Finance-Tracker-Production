
package com.finance.finance_tracker_api.service.impl;

import com.finance.finance_tracker_api.dto.request.AccountRequest;
import com.finance.finance_tracker_api.dto.response.AccountResponse;
import com.finance.finance_tracker_api.entity.Account;
import com.finance.finance_tracker_api.entity.User;
import com.finance.finance_tracker_api.mapper.AccountMapper;
import com.finance.finance_tracker_api.repository.AccountRepository;
import com.finance.finance_tracker_api.repository.UserRepository;
import com.finance.finance_tracker_api.service.interfaces.AccountService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {


    private final AccountRepository accountRepository;

    private final UserRepository userRepository;


    @Override
    public AccountResponse createAccount(AccountRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));


        Account account = AccountMapper.toEntity(request, user);


        Account savedAccount = accountRepository.save(account);


        return AccountMapper.toResponse(savedAccount);
    }



    @Override
    public List<AccountResponse> getAllAccounts() {

        return accountRepository.findAll()
                .stream()
                .map(AccountMapper::toResponse)
                .toList();
    }



    @Override
    public AccountResponse getAccountById(Integer id) {

        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        return AccountMapper.toResponse(account);
    }



    @Override
    public AccountResponse updateAccount(Integer id, AccountRequest request) {

        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));


        account.setAccountName(request.getAccountName());
        account.setAccountType(request.getAccountType());
        account.setCurrentBalance(request.getCurrentBalance());


        Account updated = accountRepository.save(account);


        return AccountMapper.toResponse(updated);
    }



    @Override
    public void deleteAccount(Integer id) {

        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        accountRepository.delete(account);
    }
}