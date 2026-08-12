package com.finance.finance_tracker_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "goal_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer goalTransactionId;

    @ManyToOne
    @JoinColumn(name = "goal_id", nullable = false)
    private Goal goal;

    @ManyToOne
    @JoinColumn(name = "transaction_id", nullable = false)
    private Transaction transaction;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal amountUsed;

    private LocalDateTime createdAt;
}