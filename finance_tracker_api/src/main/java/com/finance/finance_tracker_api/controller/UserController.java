package com.finance.finance_tracker_api.controller;

import com.finance.finance_tracker_api.dto.request.UserRequest;
import com.finance.finance_tracker_api.dto.response.UserResponse;
import com.finance.finance_tracker_api.service.interfaces.UserServiceint;
import com.finance.finance_tracker_api.util.ApiResponse;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserServiceint userService;

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUser(
            @Valid @RequestBody UserRequest request) {

        UserResponse response = userService.createUser(request);

        return new ResponseEntity<>(
                ApiResponse.<UserResponse>builder()
                        .success(true)
                        .message("User created successfully")
                        .data(response)
                        .build(),
                HttpStatus.CREATED
        );
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {

        List<UserResponse> users = userService.getAllUsers();

        return ResponseEntity.ok(
                ApiResponse.<List<UserResponse>>builder()
                        .success(true)
                        .message("Users fetched successfully")
                        .data(users)
                        .build()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> getUserById(
            @PathVariable Integer id) {

        UserResponse user = userService.getUserById(id);

        return ResponseEntity.ok(
                ApiResponse.<UserResponse>builder()
                        .success(true)
                        .message("User fetched successfully")
                        .data(user)
                        .build()
        );
    }
     @GetMapping("/test")
public String test(){
    return "Finance Tracker API is running";
}
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Integer id,
            @Valid @RequestBody UserRequest request) {

        UserResponse user = userService.updateUser(id, request);

        return ResponseEntity.ok(
                ApiResponse.<UserResponse>builder()
                        .success(true)
                        .message("User updated successfully")
                        .data(user)
                        .build()
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteUser(
            @PathVariable Integer id) {

        userService.deleteUser(id);

        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("User deleted successfully")
                        .data("User deleted successfully")
                        .build()
        );
    }
   @PatchMapping("/{id}")
public ResponseEntity<ApiResponse<UserResponse>> patchUser(
        @PathVariable Integer id,
        @Valid @RequestBody UserRequest request) {

    UserResponse user = userService.updateUser(id, request);

    return ResponseEntity.ok(
            ApiResponse.<UserResponse>builder()
                    .success(true)
                    .message("User patched successfully")
                    .data(user)
                    .build()
    );
}
}