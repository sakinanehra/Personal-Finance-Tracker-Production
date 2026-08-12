
package com.finance.finance_tracker_api.controller;

import com.finance.finance_tracker_api.dto.request.AccountRequest;
import com.finance.finance_tracker_api.dto.response.AccountResponse;
import com.finance.finance_tracker_api.service.interfaces.AccountService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/accounts")
@RequiredArgsConstructor
public class AccountController {


    private final AccountService accountService;


    // Create Account
    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(
            @RequestBody AccountRequest request) {

        return new ResponseEntity<>(
                accountService.createAccount(request),
                HttpStatus.CREATED
        );
    }


    // Get All Accounts
    @GetMapping
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {

        return ResponseEntity.ok(
                accountService.getAllAccounts()
        );
    }


    // Get Account By Id
    @GetMapping("/{id}")
    public ResponseEntity<AccountResponse> getAccountById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                accountService.getAccountById(id)
        );
    }


    // Update Account
    @PutMapping("/{id}")
    public ResponseEntity<AccountResponse> updateAccount(
            @PathVariable Integer id,
            @RequestBody AccountRequest request) {

        return ResponseEntity.ok(
                accountService.updateAccount(id, request)
        );
    }


    // Delete Account
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAccount(
            @PathVariable Integer id) {

        accountService.deleteAccount(id);

        return ResponseEntity.ok("Account deleted successfully");
    }
}