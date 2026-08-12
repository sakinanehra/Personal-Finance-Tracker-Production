package com.finance.finance_tracker_api.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalResponse {

    private Integer goalId;

    private Integer userId;

    private String userName;

    private String goalName;

    private BigDecimal targetAmount;

    private BigDecimal currentAmount;

    private LocalDate deadline;

    private String status;

    private LocalDateTime createdAt;
}