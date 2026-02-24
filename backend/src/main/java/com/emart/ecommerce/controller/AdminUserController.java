package com.emart.ecommerce.controller;

import com.emart.ecommerce.dto.UserProfileResponse;
import com.emart.ecommerce.service.AuditService;
import com.emart.ecommerce.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/admin/users")
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final UserService userService;
    private final AuditService auditService;

    public AdminUserController(UserService userService, AuditService auditService) {
        this.userService = userService;
        this.auditService = auditService;
    }

    @GetMapping
    public ResponseEntity<List<UserProfileResponse>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/{id}/roles")
    public ResponseEntity<UserProfileResponse> updateUserRoles(@PathVariable Long id, @RequestBody Set<String> roles) {
        String adminName = SecurityContextHolder.getContext().getAuthentication().getName();
        UserProfileResponse response = userService.updateUserRoles(id, roles);

        auditService.log("UPDATE_USER_ROLES", adminName,
                String.format("Updated user ID %d roles to %s", id, roles));

        return ResponseEntity.ok(response);
    }
}
