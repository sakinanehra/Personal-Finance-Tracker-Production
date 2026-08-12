package com.finance.finance_tracker_api.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalTransactionResponse {

    private Integer goalTransactionId;

    private Integer goalId;

    private String goalName;

    private Integer transactionId;

    private BigDecimal transactionAmount;

    private BigDecimal amountUsed;

    private LocalDateTime createdAt;
}