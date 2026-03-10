package com.emart.ecommerce.repository;

import com.emart.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySubCategoryCategoryName(String categoryName);

    @org.springframework.data.jpa.repository.Query("SELECT p FROM Product p WHERE p.subCategory.id = :subCategoryId")
    List<Product> findBySubCategoryId(
            @org.springframework.data.repository.query.Param("subCategoryId") Long subCategoryId);

    List<Product> findTop12ByOrderByCreatedAtDesc();
}
