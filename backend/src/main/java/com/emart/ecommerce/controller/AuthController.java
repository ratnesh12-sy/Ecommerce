package com.emart.ecommerce.controller;

import com.emart.ecommerce.dto.AuthResponse;
import com.emart.ecommerce.dto.FirebaseLoginRequest;
import com.emart.ecommerce.dto.LoginRequest;
import com.emart.ecommerce.dto.RegisterRequest;
import com.emart.ecommerce.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Email + Password Login
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("DEBUG: AuthController: Login POST reached for: " + loginRequest.getEmail());
        AuthResponse authResponse = authService.login(loginRequest);
        return ResponseEntity.ok(authResponse);
    }

    // Email + Password Register
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        System.out.println("DEBUG: AuthController: Register POST reached for: " + registerRequest.getEmail());
        String response = authService.register(registerRequest);
        return ResponseEntity.ok(response);
    }

    // Firebase Phone OTP Login
    @PostMapping("/firebase-login")
    public ResponseEntity<AuthResponse> firebaseLogin(@RequestBody FirebaseLoginRequest request) {
        AuthResponse authResponse = authService.firebaseLogin(request.getIdToken());
        return ResponseEntity.ok(authResponse);
    }
}
