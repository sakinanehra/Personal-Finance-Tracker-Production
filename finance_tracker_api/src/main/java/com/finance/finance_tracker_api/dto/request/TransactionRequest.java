package com.finance.finance_tracker_api.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionRequest {

    @NotNull
    private Integer userId;

    @NotNull
    private Integer accountId;

    @NotNull
    private Integer categoryId;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal amount;

    @NotBlank
    private String transactionType;

    private String description;
}