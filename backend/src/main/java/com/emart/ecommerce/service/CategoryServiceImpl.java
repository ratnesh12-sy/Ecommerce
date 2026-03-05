package com.emart.ecommerce.service;

import com.emart.ecommerce.dto.CategoryDTO;
import com.emart.ecommerce.dto.SubCategoryDTO;
import com.emart.ecommerce.entity.Category;
import com.emart.ecommerce.entity.Product;
import com.emart.ecommerce.entity.SubCategory;
import com.emart.ecommerce.repository.CategoryRepository;
import com.emart.ecommerce.repository.ProductRepository;
import com.emart.ecommerce.repository.SubCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;
    private final ProductRepository productRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, SubCategoryRepository subCategoryRepository,
            ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream().map(this::mapToCategoryDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<SubCategoryDTO> getSubCategoriesByCategoryId(Long categoryId) {
        return subCategoryRepository.findByCategoryId(categoryId).stream()
                .map(this::mapToSubCategoryDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Product> getProductsBySubCategoryId(Long subCategoryId) {
        return productRepository.findBySubCategoryId(subCategoryId);
    }

    private CategoryDTO mapToCategoryDTO(Category category) {
        List<SubCategoryDTO> subDTOs = category.getSubCategories().stream()
                .map(this::mapToSubCategoryDTO)
                .collect(Collectors.toList());
        return new CategoryDTO(category.getId(), category.getName(), subDTOs);
    }

    private SubCategoryDTO mapToSubCategoryDTO(SubCategory subCategory) {
        return new SubCategoryDTO(subCategory.getId(), subCategory.getName(), subCategory.getCategory().getId());
    }
}
