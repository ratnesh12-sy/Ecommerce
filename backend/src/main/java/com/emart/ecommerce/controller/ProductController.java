package com.emart.ecommerce.controller;

import com.emart.ecommerce.entity.Product;
import com.emart.ecommerce.service.AuditService;
import com.emart.ecommerce.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;
    private final AuditService auditService;

    public ProductController(ProductService productService, AuditService auditService) {
        this.productService = productService;
        this.auditService = auditService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        return new ResponseEntity<>(productService.addProduct(product), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        productService.deleteProduct(id);
        auditService.log("DELETE_PRODUCT", username, "Deleted product ID: " + id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/clear")
    public ResponseEntity<String> deleteAllProducts() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        productService.deleteAllProducts();
        auditService.log("DELETE_ALL_PRODUCTS", username, "Deleted all products to clean workspace");
        return ResponseEntity.ok("All dummy products cleared successfully");
    }
}
