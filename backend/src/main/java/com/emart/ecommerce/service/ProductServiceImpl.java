package com.emart.ecommerce.service;

import com.emart.ecommerce.entity.Product;
import com.emart.ecommerce.entity.Category;
import com.emart.ecommerce.entity.SubCategory;
import com.emart.ecommerce.repository.ProductRepository;
import com.emart.ecommerce.repository.CartItemRepository;
import com.emart.ecommerce.repository.CategoryRepository;
import com.emart.ecommerce.repository.SubCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final CategoryRepository categoryRepository;
    private final SubCategoryRepository subCategoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CartItemRepository cartItemRepository,
            CategoryRepository categoryRepository, SubCategoryRepository subCategoryRepository) {
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    private SubCategory resolveSubCategory(Product product) {
        String catName = product.getCategoryName();
        if (catName == null || catName.trim().isEmpty()) {
            catName = "General";
        }
        String subCatName = product.getSubCategoryName();
        if (subCatName == null || subCatName.trim().isEmpty()) {
            subCatName = catName; // Default to same as category if missing
        }

        final String finalCatName = catName;
        Category category = categoryRepository.findByName(finalCatName)
                .orElseGet(() -> categoryRepository.save(new Category(finalCatName)));

        final String finalSubCatName = subCatName;
        return subCategoryRepository.findByNameAndCategory(finalSubCatName, category)
                .orElseGet(() -> subCategoryRepository.save(new SubCategory(finalSubCatName, category)));
    }

    @Override
    @Transactional
    public Product addProduct(Product product) {
        product.setSubCategory(resolveSubCategory(product));
        return productRepository.save(product);
    }

    @Override
    @Transactional
    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(product.getName());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setPrice(product.getPrice());
        existingProduct.setStockQuantity(product.getStockQuantity());

        // Only update category if new ones are provided
        if (product.getCategoryName() != null || product.getSubCategoryName() != null) {
            existingProduct.setSubCategory(resolveSubCategory(product));
            existingProduct.setCategoryName(product.getCategoryName());
            existingProduct.setSubCategoryName(product.getSubCategoryName());
        }

        existingProduct.setImageUrl(product.getImageUrl());

        return productRepository.save(existingProduct);
    }

    @Override
    public void deleteProduct(Long id) {
        // Find cart items referring to this product and remove them first to prevent
        // foreign key constraint exceptions
        cartItemRepository.deleteAll(cartItemRepository.findByProductId(id));
        productRepository.deleteById(id);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findBySubCategoryCategoryName(category);
    }

    @Override
    public List<Product> getLatestProducts() {
        return productRepository.findTop12ByOrderByCreatedAtDesc();
    }

    @Override
    public void deleteAllProducts() {
        cartItemRepository.deleteAll();
        productRepository.deleteAll();
    }
}
