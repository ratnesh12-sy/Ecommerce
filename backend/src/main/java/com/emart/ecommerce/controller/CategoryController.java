package com.emart.ecommerce.controller;

import com.emart.ecommerce.dto.CategoryDTO;
import com.emart.ecommerce.dto.SubCategoryDTO;
import com.emart.ecommerce.entity.Product;
import com.emart.ecommerce.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @GetMapping("/categories/{categoryId}/subcategories")
    public ResponseEntity<List<SubCategoryDTO>> getSubCategories(@PathVariable Long categoryId) {
        return ResponseEntity.ok(categoryService.getSubCategoriesByCategoryId(categoryId));
    }

    @GetMapping("/subcategories/{subCategoryId}/products")
    public ResponseEntity<List<Product>> getProductsBySubCategory(@PathVariable Long subCategoryId) {
        return ResponseEntity.ok(categoryService.getProductsBySubCategoryId(subCategoryId));
    }
}
