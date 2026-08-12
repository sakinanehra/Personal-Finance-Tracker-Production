package com.finance.finance_tracker_api.repository;
import java.util.List;
import com.finance.finance_tracker_api.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByUserUserId(Integer userId);
}