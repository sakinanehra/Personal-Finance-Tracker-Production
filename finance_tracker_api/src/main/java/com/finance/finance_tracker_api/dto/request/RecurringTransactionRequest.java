
package com.finance.finance_tracker_api.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecurringTransactionRequest {

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
    private String frequency;

    private LocalDate nextDueDate;

    private String status;

}