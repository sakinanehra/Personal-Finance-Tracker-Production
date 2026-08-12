package com.finance.finance_tracker_api.exception;

import com.finance.finance_tracker_api.util.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFound(
            ResourceNotFoundException exception
    ){

        ApiResponse<Object> response = ApiResponse.builder()
                .success(false)
                .message(exception.getMessage())
                .data(null)
                .build();


        return new ResponseEntity<>(
                response,
                HttpStatus.NOT_FOUND
        );
    }

}
