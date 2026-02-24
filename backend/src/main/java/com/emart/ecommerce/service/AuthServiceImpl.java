package com.emart.ecommerce.service;

import com.emart.ecommerce.dto.AuthResponse;
import com.emart.ecommerce.dto.LoginRequest;
import com.emart.ecommerce.dto.RegisterRequest;
import com.emart.ecommerce.entity.User;
import com.emart.ecommerce.repository.UserRepository;
import com.emart.ecommerce.security.JwtProperties;
import com.emart.ecommerce.security.JwtTokenProvider;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtProperties jwtProperties;

    public AuthServiceImpl(AuthenticationManager authenticationManager,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider jwtTokenProvider,
            JwtProperties jwtProperties) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.jwtProperties = jwtProperties;
    }

    // ─── Email + Password Login ───
    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        // Dev Hook: Hardcoded admin access for immediate entry
        if ("admin@emart.com".equals(loginRequest.getEmail()) && "admin123".equals(loginRequest.getPassword())) {
            Set<String> roles = new HashSet<>();
            roles.add("ROLE_USER");
            roles.add("ROLE_ADMIN");
            String token = jwtTokenProvider.generateToken("admin@emart.com", roles, 3600000);
            return new AuthResponse(token);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));

        String token = jwtTokenProvider.generateToken(authentication);
        return new AuthResponse(token);
    }

    // ─── Email + Password Register ───
    @Override
    public String register(RegisterRequest registerRequest) {
        System.out.println("DEBUG: Register request received for email: " + registerRequest.getEmail());
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            System.out.println("DEBUG: Email already exists: " + registerRequest.getEmail());
            throw new RuntimeException("Email is already exists!.");
        }

        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

        Set<String> roles = new HashSet<>();
        roles.add("ROLE_USER");
        user.setRoles(roles);

        System.out.println("DEBUG: Attempting to save user to database...");
        userRepository.save(user);
        System.out.println("DEBUG: User saved successfully!");
        return "User registered successfully!";
    }

    // ─── Firebase Phone OTP Login ───
    @Override
    public AuthResponse firebaseLogin(String idToken) {
        try {
            // 1. Verify the Firebase ID token
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

            // 2. Extract phone number from the decoded token
            String phoneNumber = decodedToken.getClaims().get("phone_number") != null
                    ? decodedToken.getClaims().get("phone_number").toString()
                    : null;

            if (phoneNumber == null || phoneNumber.isEmpty()) {
                throw new RuntimeException("Phone number not found in Firebase token.");
            }

            // 3. Find or create user by mobile number
            User user = userRepository.findByMobileNumber(phoneNumber)
                    .orElseGet(() -> {
                        User newUser = new User();
                        newUser.setMobileNumber(phoneNumber);
                        newUser.setName("User");

                        Set<String> roles = new HashSet<>();
                        roles.add("ROLE_USER");
                        newUser.setRoles(roles);

                        return userRepository.save(newUser);
                    });

            // 4. Generate JWT with mobile number as subject and roles
            String jwt = jwtTokenProvider.generateToken(user.getMobileNumber(), user.getRoles(),
                    jwtProperties.getExpirationMilliseconds());

            return new AuthResponse(jwt);

        } catch (RuntimeException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Firebase authentication failed: " + e.getMessage(), e);
        }
    }
}
