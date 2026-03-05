package com.emart.ecommerce.config;

import com.emart.ecommerce.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;

@Configuration
public class DataSeeder {

        @Bean
        public CommandLineRunner loadData(ProductService productService, JdbcTemplate jdbcTemplate) {
                return args -> {
                        // productService.deleteAllProducts(); // Disabled to preserve user database

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

                        // 3. Migrate any products holding NULL sub_category_id to this default
                        int updated = jdbcTemplate.update(
                                        "UPDATE products SET sub_category_id = ? WHERE sub_category_id IS NULL",
                                        subCatId);

                        if (updated > 0) {
                                System.out.println("DataSeeder: Migrated " + updated
                                                + " orphaned products to Uncategorized > General");
                        } else {
                                System.out.println("DataSeeder: Database is clean, no orphaned products found.");
                        }
                };
        }
}
