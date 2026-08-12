package com.finance.finance_tracker_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "recurring_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecurringTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recurringId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable =false)
    private Category category;

    @Column(nullable = false, precision = 12)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private Frequency frequency;

    private LocalDate nextDueDate;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private RecurringStatus status = RecurringStatus.ACTIVE;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}