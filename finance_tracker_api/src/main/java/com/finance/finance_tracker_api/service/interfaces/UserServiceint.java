package com.finance.finance_tracker_api.service.interfaces;

import com.finance.finance_tracker_api.dto.request.UserRequest;
import com.finance.finance_tracker_api.dto.response.UserResponse;

import java.util.List;

public interface UserServiceint {

    UserResponse createUser(UserRequest request);

    List<UserResponse> getAllUsers();

    UserResponse getUserById(Integer id);

    UserResponse updateUser(Integer id, UserRequest request);

    void deleteUser(Integer id);
}