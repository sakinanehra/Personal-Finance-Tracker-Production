package com.finance.finance_tracker_api.service.interfaces;

import com.finance.finance_tracker_api.dto.request.CategoryRequest;
import com.finance.finance_tracker_api.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryServiceint {

    CategoryResponse createCategory(CategoryRequest request);

    List<CategoryResponse> getAllCategories();
    List<CategoryResponse> getCategoriesByUser(Integer userId);
    CategoryResponse getCategoryById(Integer id);

    CategoryResponse updateCategory(Integer id, CategoryRequest request);

    void deleteCategory(Integer id);
}