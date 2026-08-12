package com.finance.finance_tracker_api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.math.BigDecimal;
@Entity
@Table(name = "accounts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer accountId;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(nullable = false, length = 100)
    private String accountName;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AccountType accountType;


   @Column(precision = 12, scale = 2)
private BigDecimal currentBalance;


    private LocalDateTime createdAt;
}