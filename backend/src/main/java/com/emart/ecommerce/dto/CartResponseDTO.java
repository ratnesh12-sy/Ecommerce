package com.emart.ecommerce.dto;

import java.math.BigDecimal;
import java.util.List;

public class CartResponseDTO {

    private List<CartItemDTO> items;
    private BigDecimal subtotal;
    private int totalItems;

    public CartResponseDTO() {
    }

    public CartResponseDTO(List<CartItemDTO> items, BigDecimal subtotal, int totalItems) {
        this.items = items;
        this.subtotal = subtotal;
        this.totalItems = totalItems;
    }

    public List<CartItemDTO> getItems() {
        return items;
    }

    public void setItems(List<CartItemDTO> items) {
        this.items = items;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public int getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(int totalItems) {
        this.totalItems = totalItems;
    }
}
