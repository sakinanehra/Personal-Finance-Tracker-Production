package com.finance.finance_tracker_api.service.interfaces;

import com.finance.finance_tracker_api.dto.request.AccountRequest;
import com.finance.finance_tracker_api.dto.response.AccountResponse;

import java.util.List;

public interface AccountService {

    AccountResponse createAccount(AccountRequest request);

    List<AccountResponse> getAllAccounts();

   AccountResponse getAccountById(Integer id);

AccountResponse updateAccount(Integer id, AccountRequest request);

void deleteAccount(Integer id);
}