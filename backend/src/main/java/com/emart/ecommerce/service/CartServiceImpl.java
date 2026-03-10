package com.emart.ecommerce.service;

import com.emart.ecommerce.dto.CartItemDTO;
import com.emart.ecommerce.dto.CartResponseDTO;
import com.emart.ecommerce.entity.Cart;
import com.emart.ecommerce.entity.CartItem;
import com.emart.ecommerce.entity.Product;
import com.emart.ecommerce.entity.User;
import com.emart.ecommerce.repository.CartItemRepository;
import com.emart.ecommerce.repository.CartRepository;
import com.emart.ecommerce.repository.ProductRepository;
import com.emart.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public CartServiceImpl(CartItemRepository cartItemRepository,
            CartRepository cartRepository,
            ProductRepository productRepository,
            UserRepository userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user).orElseGet(() -> {
            Cart newCart = new Cart(user);
            return cartRepository.save(newCart);
        });
    }

    private CartResponseDTO buildCartResponse(Cart cart) {
        List<CartItemDTO> itemDTOs = cart.getItems().stream().map(item -> {
            BigDecimal itemTotal = item.getPriceAtTime().multiply(BigDecimal.valueOf(item.getQuantity()));
            return new CartItemDTO(
                    item.getId(),
                    item.getProduct().getId(),
                    item.getProduct().getName(),
                    item.getProduct().getImageUrl(),
                    item.getQuantity(),
                    item.getPriceAtTime(),
                    itemTotal);
        }).collect(Collectors.toList());

        BigDecimal subtotal = itemDTOs.stream()
                .map(CartItemDTO::getItemTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int totalItems = itemDTOs.stream()
                .mapToInt(CartItemDTO::getQuantity)
                .sum();

        return new CartResponseDTO(itemDTOs, subtotal, totalItems);
    }

    @Override
    @Transactional
    public CartResponseDTO addToCart(Long productId, Integer quantity, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = getOrCreateCart(user);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Integer stock = product.getStockQuantity() != null ? product.getStockQuantity() : 0;
        if (stock < quantity) {
            throw new RuntimeException(
                    "Insufficient stock for product: " + product.getName() + " (Stock: " + stock + ")");
        }

        Optional<CartItem> existingItemOptional = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();

        if (existingItemOptional.isPresent()) {
            CartItem existingItem = existingItemOptional.get();
            int newQuantity = existingItem.getQuantity() + quantity;
            if (stock < newQuantity) {
                throw new RuntimeException(
                        "Insufficient stock to add more of: " + product.getName() + " (Stock: " + stock + ")");
            }
            existingItem.setQuantity(newQuantity);
            existingItem.setPriceAtTime(product.getPrice());
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = new CartItem(null, cart, product, quantity, product.getPrice());
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }

        return buildCartResponse(cartRepository.save(cart));
    }

    @Override
    @Transactional(readOnly = true)
    public CartResponseDTO getCartItems(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = getOrCreateCart(user);
        return buildCartResponse(cart);
    }

    @Override
    @Transactional
    public CartResponseDTO updateCartItem(Long cartItemId, Integer quantity, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = getOrCreateCart(user);

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Unauthorized action on cart item");
        }

        if (quantity <= 0) {
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
        } else {
            Integer stock = item.getProduct().getStockQuantity() != null ? item.getProduct().getStockQuantity() : 0;
            if (stock < quantity) {
                throw new RuntimeException(
                        "Insufficient stock for product: " + item.getProduct().getName() + " (Stock: " + stock + ")");
            }
            item.setQuantity(quantity);
            // Optional: Update price to latest or keep the old one? Usually we can keep
            // latest price
            item.setPriceAtTime(item.getProduct().getPrice());
            cartItemRepository.save(item);
        }

        return buildCartResponse(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public CartResponseDTO removeFromCart(Long cartItemId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Cart cart = getOrCreateCart(user);

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!item.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Unauthorized action on cart item");
        }

        cart.getItems().remove(item);
        cartItemRepository.delete(item);

        return buildCartResponse(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public void clearCart(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        cartRepository.findByUser(user).ifPresent(cart -> {
            cartItemRepository.deleteByCart(cart);
            cart.getItems().clear();
            cartRepository.save(cart);
        });
    }
}
