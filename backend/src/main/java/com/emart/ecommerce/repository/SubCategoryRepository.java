package com.emart.ecommerce.repository;

import com.emart.ecommerce.entity.Category;
import com.emart.ecommerce.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
    Optional<SubCategory> findByNameAndCategory(String name, Category category);

    List<SubCategory> findByCategoryId(Long categoryId);
}
