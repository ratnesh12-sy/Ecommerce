package com.emart.ecommerce.controller;

import com.emart.ecommerce.service.CartService;
import com.emart.ecommerce.dto.CartResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addToCart(@PathVariable Long productId,
            @RequestParam(defaultValue = "1") Integer quantity,
            Authentication authentication) {
        try {
            return ResponseEntity.ok(cartService.addToCart(productId, quantity, authentication.getName()));
        } catch (RuntimeException e) {
            System.err.println("Error adding to cart: " + e.getMessage());
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<CartResponseDTO> getCartItems(Authentication authentication) {
        return ResponseEntity.ok(cartService.getCartItems(authentication.getName()));
    }

    @PutMapping("/update/{itemId}")
    public ResponseEntity<CartResponseDTO> updateCartItem(@PathVariable Long itemId,
            @RequestParam Integer quantity,
            Authentication authentication) {
        try {
            return ResponseEntity.ok(cartService.updateCartItem(itemId, quantity, authentication.getName()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<CartResponseDTO> removeFromCart(@PathVariable Long itemId,
            Authentication authentication) {
        try {
            return ResponseEntity.ok(cartService.removeFromCart(itemId, authentication.getName()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(Authentication authentication) {
        cartService.clearCart(authentication.getName());
        return ResponseEntity.ok("Cart cleared");
    }
}
