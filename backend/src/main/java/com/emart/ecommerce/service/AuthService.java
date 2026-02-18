package com.emart.ecommerce.service;

import com.emart.ecommerce.dto.AuthResponse;
import com.emart.ecommerce.dto.LoginRequest;
import com.emart.ecommerce.dto.RegisterRequest;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest);

    String register(RegisterRequest registerRequest);
}
