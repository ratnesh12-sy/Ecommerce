package com.emart.ecommerce.dto;

import java.util.List;

public class CategoryDTO {
    private Long id;
    private String name;
    private List<SubCategoryDTO> subCategories;

    public CategoryDTO() {
    }

    public CategoryDTO(Long id, String name, List<SubCategoryDTO> subCategories) {
        this.id = id;
        this.name = name;
        this.subCategories = subCategories;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<SubCategoryDTO> getSubCategories() {
        return subCategories;
    }

    public void setSubCategories(List<SubCategoryDTO> subCategories) {
        this.subCategories = subCategories;
    }
}
