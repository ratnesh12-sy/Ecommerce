package com.emart.ecommerce.service;

import com.emart.ecommerce.entity.CartItem;
import java.util.List;

public interface CartService {
    CartItem addToCart(Long productId, Integer quantity, String userEmail);

    List<CartItem> getCartItems(String userEmail);

    void removeFromCart(Long cartItemId);

    void clearCart(String userEmail);
}
