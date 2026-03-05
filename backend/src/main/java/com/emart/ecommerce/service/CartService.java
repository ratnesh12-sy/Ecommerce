package com.emart.ecommerce.service;

import com.emart.ecommerce.dto.CartResponseDTO;

public interface CartService {
    CartResponseDTO addToCart(Long productId, Integer quantity, String userEmail);

    CartResponseDTO getCartItems(String userEmail);

    CartResponseDTO updateCartItem(Long cartItemId, Integer quantity, String userEmail);

    CartResponseDTO removeFromCart(Long cartItemId, String userEmail);

    void clearCart(String userEmail);
}
