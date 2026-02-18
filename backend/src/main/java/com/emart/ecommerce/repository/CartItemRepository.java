package com.emart.ecommerce.repository;

import com.emart.ecommerce.entity.CartItem;
import com.emart.ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user);

    void deleteByUser(User user);
}
