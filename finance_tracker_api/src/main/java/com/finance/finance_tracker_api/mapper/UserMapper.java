package com.finance.finance_tracker_api.mapper;

import com.finance.finance_tracker_api.dto.request.UserRequest;
import com.finance.finance_tracker_api.dto.response.UserResponse;
import com.finance.finance_tracker_api.entity.User;

public class UserMapper {

    // Request DTO -> Entity
    public static User toEntity(UserRequest request) {
        return User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();
    }

    // Entity -> Response DTO
    public static UserResponse toResponse(User user) {
        return UserResponse.builder()
                .userId(user.getUserId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
