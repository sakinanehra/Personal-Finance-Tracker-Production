

package com.finance.finance_tracker_api.mapper;

import com.finance.finance_tracker_api.dto.response.CategoryResponse;
import com.finance.finance_tracker_api.entity.Category;

public class CategoryMapper {

    public static CategoryResponse toResponse(Category category) {

        return CategoryResponse.builder()
                .categoryId(category.getCategoryId())
                .userId(category.getUser().getUserId())
                .categoryName(category.getCategoryName())
                .type(category.getType())
                .createdAt(category.getCreatedAt())
                .build();
    }
}
