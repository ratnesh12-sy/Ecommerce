package com.emart.ecommerce.service;

import com.emart.ecommerce.entity.Order;
import java.util.List;

public interface OrderService {
    Order placeOrder(String userEmail);

    List<Order> getUserOrders(String userEmail);

    Order getOrderById(Long orderId);
}
