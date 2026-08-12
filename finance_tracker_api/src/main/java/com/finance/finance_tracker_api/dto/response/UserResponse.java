package com.finance.finance_tracker_api.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private Integer userId;

    private String fullName;

    private String email;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}