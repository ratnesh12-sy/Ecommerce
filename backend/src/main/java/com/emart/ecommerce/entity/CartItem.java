package com.emart.ecommerce.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "price_at_time", nullable = false)
    private java.math.BigDecimal priceAtTime;

    public CartItem() {
    }

    public CartItem(Long id, Cart cart, Product product, Integer quantity, java.math.BigDecimal priceAtTime) {
        this.id = id;
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
        this.priceAtTime = priceAtTime;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public java.math.BigDecimal getPriceAtTime() {
        return priceAtTime;
    }

    public void setPriceAtTime(java.math.BigDecimal priceAtTime) {
        this.priceAtTime = priceAtTime;
    }
}
