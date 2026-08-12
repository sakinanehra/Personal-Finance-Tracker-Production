package com.finance.finance_tracker_api.dto.response;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryResponse {

    private Integer categoryId;
    private Integer userId;
    private String categoryName;
    private String type;
    private LocalDateTime createdAt;
}