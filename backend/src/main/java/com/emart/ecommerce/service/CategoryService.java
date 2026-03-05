package com.emart.ecommerce.service;

import com.emart.ecommerce.dto.CategoryDTO;
import com.emart.ecommerce.dto.SubCategoryDTO;
import com.emart.ecommerce.entity.Product;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getAllCategories();

    List<SubCategoryDTO> getSubCategoriesByCategoryId(Long categoryId);

    List<Product> getProductsBySubCategoryId(Long subCategoryId);
}
