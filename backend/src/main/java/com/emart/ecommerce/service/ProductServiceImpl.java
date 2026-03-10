package com.emart.ecommerce.service;

import com.emart.ecommerce.entity.Product;
import com.emart.ecommerce.entity.SubCategory;
import com.emart.ecommerce.repository.ProductRepository;
import com.emart.ecommerce.repository.CartItemRepository;
import com.emart.ecommerce.repository.SubCategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final SubCategoryRepository subCategoryRepository;

    public ProductServiceImpl(ProductRepository productRepository, CartItemRepository cartItemRepository,
            SubCategoryRepository subCategoryRepository) {
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

    @Override
    @Transactional
    public Product addProduct(Product product) {
        if (product.getSubCategoryId() != null) {
            SubCategory subCategory = subCategoryRepository.findById(product.getSubCategoryId())
                    .orElseThrow(() -> new RuntimeException("SubCategory not found"));
            product.setSubCategory(subCategory);
        } else {
            throw new RuntimeException("Product must have a subCategoryId to be linked properly");
        }
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

        if (product.getSubCategoryId() != null) {
            SubCategory subCategory = subCategoryRepository.findById(product.getSubCategoryId())
                    .orElseThrow(() -> new RuntimeException("SubCategory not found"));
            existingProduct.setSubCategory(subCategory);
            existingProduct.setCategoryId(subCategory.getCategory().getId());
            existingProduct.setSubCategoryId(subCategory.getId());
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
