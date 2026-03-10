package com.emart.ecommerce.config;

import com.emart.ecommerce.entity.User;
import com.emart.ecommerce.repository.UserRepository;
import com.emart.ecommerce.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class DataSeeder {

        @Bean
        public CommandLineRunner loadData(ProductService productService, UserRepository userRepository,
                        PasswordEncoder passwordEncoder, JdbcTemplate jdbcTemplate) {
                return args -> {
                        // 1. Ensure "Uncategorized" Category exists
                        jdbcTemplate.execute("INSERT IGNORE INTO categories (name) VALUES ('Uncategorized')");
                        Long catId = jdbcTemplate.queryForObject(
                                        "SELECT id FROM categories WHERE name = 'Uncategorized'", Long.class);

                        // 2. Ensure "General" SubCategory exists under "Uncategorized"
                        jdbcTemplate.execute("INSERT IGNORE INTO sub_categories (name, category_id) VALUES ('General', "
                                        + catId + ")");
                        Long subCatId = jdbcTemplate.queryForObject(
                                        "SELECT id FROM sub_categories WHERE name = 'General' AND category_id = "
                                                        + catId,
                                        Long.class);

                        // 3. Ensure all products have a subcategory and stock for testing
                        jdbcTemplate.update("UPDATE products SET sub_category_id = ? WHERE sub_category_id IS NULL",
                                        subCatId);
                        jdbcTemplate.update(
                                        "UPDATE products SET stock_quantity = 100 WHERE stock_quantity = 0 OR stock_quantity IS NULL");

                        // 4. Role Prefix Migration (Defensive)
                        jdbcTemplate.update(
                                        "UPDATE user_roles SET role = CONCAT('ROLE_', role) WHERE role NOT LIKE 'ROLE_%'");

                        // 5. Setup Admin Account for verification
                        if (!userRepository.existsByEmail("admin@emart.com")) {
                                User admin = new User();
                                admin.setName("Administrator");
                                admin.setEmail("admin@emart.com");
                                admin.setPassword(passwordEncoder.encode("admin123"));
                                Set<String> roles = new HashSet<>();
                                roles.add("ROLE_USER");
                                roles.add("ROLE_ADMIN");
                                admin.setRoles(roles);
                                userRepository.save(admin);
                        }

                        System.out.println("DataSeeder: Initial data seeding and role migration completed.");
                };
        }
}
