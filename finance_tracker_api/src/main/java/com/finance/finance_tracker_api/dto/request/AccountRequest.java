package com.finance.finance_tracker_api.dto.request;

import java.math.BigDecimal;

import com.finance.finance_tracker_api.entity.AccountType;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountRequest {

    private Integer userId;

    private String accountName;

    private AccountType accountType;
private BigDecimal currentBalance;
}