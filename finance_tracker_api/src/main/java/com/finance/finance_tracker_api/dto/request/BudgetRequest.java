package com.finance.finance_tracker_api.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BudgetRequest {

    @NotNull
    private Integer userId;

    @NotNull
    @Min(1)
    @Max(12)
    private Integer budgetMonth;

    @NotNull
    private Integer budgetYear;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal budgetAmount;
}
