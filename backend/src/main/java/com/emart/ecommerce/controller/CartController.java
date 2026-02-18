package com.emart.ecommerce.controller;

import com.emart.ecommerce.entity.CartItem;
import com.emart.ecommerce.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<CartItem> addToCart(@PathVariable Long productId,
            @RequestParam Integer quantity,
            Authentication authentication) {
        return ResponseEntity.ok(cartService.addToCart(productId, quantity, authentication.getName()));
    }

    @GetMapping
    public List<CartItem> getCartItems(Authentication authentication) {
        return cartService.getCartItems(authentication.getName());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long id) {
        cartService.removeFromCart(id);
        return ResponseEntity.ok("Item removed from cart");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(Authentication authentication) {
        cartService.clearCart(authentication.getName());
        return ResponseEntity.ok("Cart cleared");
    }
}
