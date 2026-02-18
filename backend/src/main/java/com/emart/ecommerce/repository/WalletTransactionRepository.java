package com.emart.ecommerce.repository;

import com.emart.ecommerce.entity.User;
import com.emart.ecommerce.entity.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    List<WalletTransaction> findByUser(User user);
}
