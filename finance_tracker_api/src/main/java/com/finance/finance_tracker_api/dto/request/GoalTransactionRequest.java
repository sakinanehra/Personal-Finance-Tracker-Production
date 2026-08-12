package com.finance.finance_tracker_api.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalTransactionRequest {

    @NotNull
    private Integer goalId;

    @NotNull
    private Integer transactionId;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal amountUsed;
}