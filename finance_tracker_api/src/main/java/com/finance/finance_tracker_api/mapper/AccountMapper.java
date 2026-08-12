package com.finance.finance_tracker_api.mapper;

import com.finance.finance_tracker_api.dto.request.AccountRequest;
import com.finance.finance_tracker_api.dto.response.AccountResponse;
import com.finance.finance_tracker_api.entity.Account;
import com.finance.finance_tracker_api.entity.User;

public class AccountMapper {


    public static Account toEntity(AccountRequest request, User user) {

        return Account.builder()
                .user(user)
                .accountName(request.getAccountName())
                .accountType(request.getAccountType())
                .currentBalance(request.getCurrentBalance())
                .build();
    }


    public static AccountResponse toResponse(Account account) {

        return AccountResponse.builder()
                .accountId(account.getAccountId())
                .userId(account.getUser().getUserId())
                .accountName(account.getAccountName())
                .accountType(account.getAccountType())
                .currentBalance(account.getCurrentBalance())
                .createdAt(account.getCreatedAt())
                .build();
    }
}