package com.emart.ecommerce.controller;

import com.emart.ecommerce.dto.UpdateProfileRequest;
import com.emart.ecommerce.dto.UserProfileResponse;
import com.emart.ecommerce.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getProfile(Authentication authentication) {
        String identifier = authentication.getName();
        UserProfileResponse profile = userService.getProfile(identifier);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile")
    public ResponseEntity<UserProfileResponse> updateProfile(
            Authentication authentication,
            @RequestBody UpdateProfileRequest request) {
        String identifier = authentication.getName();
        UserProfileResponse updated = userService.updateProfile(identifier, request);
        return ResponseEntity.ok(updated);
    }
}
