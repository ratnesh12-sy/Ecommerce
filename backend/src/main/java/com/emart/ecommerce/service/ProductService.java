package com.emart.ecommerce.service;

import com.emart.ecommerce.entity.Product;
import java.util.List;

public interface ProductService {
    Product addProduct(Product product);

    Product updateProduct(Long id, Product product);

    void deleteProduct(Long id);

    Product getProductById(Long id);

    List<Product> getAllProducts();

    List<Product> getProductsByCategory(String category);
}
