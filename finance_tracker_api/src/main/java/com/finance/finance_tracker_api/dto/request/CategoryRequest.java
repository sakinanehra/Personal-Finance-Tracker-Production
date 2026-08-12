package com.finance.finance_tracker_api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryRequest {

    @NotNull
    private Integer userId;

    @NotBlank
    private String categoryName;

    @NotBlank
    private String type;
}
