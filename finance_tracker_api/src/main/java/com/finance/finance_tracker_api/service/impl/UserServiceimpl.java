
package com.finance.finance_tracker_api.service.impl;

import com.finance.finance_tracker_api.dto.request.UserRequest;
import com.finance.finance_tracker_api.dto.response.UserResponse;
import com.finance.finance_tracker_api.entity.Category;
import com.finance.finance_tracker_api.entity.User;
import com.finance.finance_tracker_api.exception.ResourceNotFoundException;
import com.finance.finance_tracker_api.mapper.UserMapper;
import com.finance.finance_tracker_api.repository.CategoryRepository;
import com.finance.finance_tracker_api.repository.UserRepository;
import com.finance.finance_tracker_api.service.interfaces.UserServiceint;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceimpl implements UserServiceint {

   private final UserRepository userRepository;
private final CategoryRepository categoryRepository;

    public UserServiceimpl(UserRepository userRepository,
                       CategoryRepository categoryRepository) {

    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
}

    @Override
    public UserResponse createUser(UserRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = UserMapper.toEntity(request);

        User savedUser = userRepository.save(user);
        createDefaultCategories(savedUser);
        return UserMapper.toResponse(savedUser);
    }
    private void createDefaultCategories(User user) {

    List<Category> categories = List.of(

            Category.builder()
                    .user(user)
                    .categoryName("Salary")
                    .type("income")
                    .build(),

            Category.builder()
                    .user(user)
                    .categoryName("Food")
                    .type("expense")
                    .build(),

            Category.builder()
                    .user(user)
                    .categoryName("Travel")
                    .type("expense")
                    .build(),

            Category.builder()
                    .user(user)
                    .categoryName("Bills")
                    .type("expense")
                    .build(),

            Category.builder()
                    .user(user)
                    .categoryName("Health")
                    .type("expense")
                    .build(),

            Category.builder()
                    .user(user)
                    .categoryName("Entertainment")
                    .type("expense")
                    .build(),

            Category.builder()
                    .user(user)
                    .categoryName("Emergency Fund")
                    .type("savings")
                    .build(),

            Category.builder()
                    .user(user)
                    .categoryName("Vacation Fund")
                    .type("savings")
                    .build()

    );

    categoryRepository.saveAll(categories);
}
private Category createCategory(User user, String name, String type){

    Category category = new Category();

    category.setUser(user);
    category.setCategoryName(name);
    category.setType(type);

    return category;
}

    @Override
    public List<UserResponse> getAllUsers() {

        List<User> users = userRepository.findAll();

        return users.stream()
                .map(UserMapper::toResponse)
                .toList();
    }

    @Override
    public UserResponse getUserById(Integer id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id : " + id));

        return UserMapper.toResponse(user);
    }

    @Override
    public UserResponse updateUser(Integer id, UserRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id : " + id));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User updatedUser = userRepository.save(user);

        return UserMapper.toResponse(updatedUser);
    }

    @Override
    public void deleteUser(Integer id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found with id : " + id));

        userRepository.delete(user);
    }
}