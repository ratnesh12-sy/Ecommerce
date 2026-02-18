package com.emart.ecommerce.controller;

import com.emart.ecommerce.entity.Order;
import com.emart.ecommerce.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(Authentication authentication) {
        return ResponseEntity.ok(orderService.placeOrder(authentication.getName()));
    }

    @GetMapping
    public List<Order> getUserOrders(Authentication authentication) {
        return orderService.getUserOrders(authentication.getName());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }
}
