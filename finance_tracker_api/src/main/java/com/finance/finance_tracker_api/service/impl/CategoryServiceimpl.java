package com.finance.finance_tracker_api.service.impl ;

import com.finance.finance_tracker_api.dto.request.CategoryRequest;
import com.finance.finance_tracker_api.dto.response.CategoryResponse;
import com.finance.finance_tracker_api.entity.Category;
import com.finance.finance_tracker_api.entity.User;
import com.finance.finance_tracker_api.mapper.CategoryMapper;
import com.finance.finance_tracker_api.repository.CategoryRepository;
import com.finance.finance_tracker_api.repository.UserRepository;
import com.finance.finance_tracker_api.service.interfaces.CategoryServiceint;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceimpl implements CategoryServiceint {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Override
    public CategoryResponse createCategory(CategoryRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = Category.builder()
                .user(user)
                .categoryName(request.getCategoryName())
                .type(request.getType())
                .build();

        return CategoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    public List<CategoryResponse> getAllCategories() {

        return categoryRepository.findAll()
                .stream()
                .map(CategoryMapper::toResponse)
                .toList();
    }

    @Override
    public CategoryResponse getCategoryById(Integer id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        return CategoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse updateCategory(Integer id, CategoryRequest request) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        category.setUser(user);
        category.setCategoryName(request.getCategoryName());
        category.setType(request.getType());

        return CategoryMapper.toResponse(categoryRepository.save(category));
    }

    @Override
    public void deleteCategory(Integer id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        categoryRepository.delete(category);
    }
    @Override
public List<CategoryResponse> getCategoriesByUser(Integer userId){

    return categoryRepository.findByUserUserId(userId)
            .stream()
            .map(CategoryMapper::toResponse)
            .toList();
}
}