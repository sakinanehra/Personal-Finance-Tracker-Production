package com.finance.finance_tracker_api.dto.response;

import com.finance.finance_tracker_api.entity.AccountType;
import lombok.*;
import java.math.BigDecimal;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountResponse {

    private Integer accountId;

    private Integer userId;

    private String accountName;

    private AccountType accountType;

    
private BigDecimal currentBalance;

    private LocalDateTime createdAt;
}