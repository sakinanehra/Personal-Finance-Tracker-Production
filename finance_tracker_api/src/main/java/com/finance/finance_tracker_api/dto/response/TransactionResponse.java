package com.finance.finance_tracker_api.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionResponse {

    private Integer transactionId;

    private Integer userId;

    private String userName;

    private Integer accountId;

    private String accountName;

    private Integer categoryId;

    private String categoryName;

    private BigDecimal amount;

    private String transactionType;

    private String description;

    private LocalDateTime transactionDate;
}