
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
public class GoalRequest {

    @NotNull
    private Integer userId;

    @NotBlank
    @Size(max = 100)
    private String goalName;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal targetAmount;

    private BigDecimal currentAmount;

    private LocalDate deadline;

    private String status;
}