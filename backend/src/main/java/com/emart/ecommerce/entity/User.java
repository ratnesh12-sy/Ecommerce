package com.emart.ecommerce.entity;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String membershipLevel = "Gold Member";

    @Column(nullable = false)
    private Integer loyaltyPoints = 0;

    @Column(nullable = false)
    private java.math.BigDecimal walletBalance = java.math.BigDecimal.ZERO;

    private String profileImage;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles;

    public User() {
    }

    public User(Long id, String name, String email, String password, String membershipLevel, Integer loyaltyPoints,
            java.math.BigDecimal walletBalance, String profileImage, Set<String> roles) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.membershipLevel = membershipLevel;
        this.loyaltyPoints = loyaltyPoints;
        this.walletBalance = walletBalance;
        this.profileImage = profileImage;
        this.roles = roles;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMembershipLevel() {
        return membershipLevel;
    }

    public void setMembershipLevel(String membershipLevel) {
        this.membershipLevel = membershipLevel;
    }

    public Integer getLoyaltyPoints() {
        return loyaltyPoints;
    }

    public void setLoyaltyPoints(Integer loyaltyPoints) {
        this.loyaltyPoints = loyaltyPoints;
    }

    public java.math.BigDecimal getWalletBalance() {
        return walletBalance;
    }

    public void setWalletBalance(java.math.BigDecimal walletBalance) {
        this.walletBalance = walletBalance;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
