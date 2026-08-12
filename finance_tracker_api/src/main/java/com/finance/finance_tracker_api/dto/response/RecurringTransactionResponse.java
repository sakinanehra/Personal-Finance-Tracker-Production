
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
public class RecurringTransactionResponse {

    private Integer recurringId;

    private Integer userId;

    private String userName;

    private Integer accountId;

    private String accountName;

    private Integer categoryId;

    private String categoryName;

    private BigDecimal amount;

    private String frequency;

    private LocalDate nextDueDate;

    private String status;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}