package com.emart.ecommerce.service;

import com.emart.ecommerce.dto.UpdateProfileRequest;
import com.emart.ecommerce.dto.UserProfileResponse;
import com.emart.ecommerce.entity.User;
import com.emart.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserProfileResponse getProfile(String identifier) {
        User user = findUserByIdentifier(identifier);
        return mapToResponse(user);
    }

    @Override
    public UserProfileResponse updateProfile(String identifier, UpdateProfileRequest request) {
        User user = findUserByIdentifier(identifier);

        // Update name if provided
        if (request.getName() != null && !request.getName().isBlank()) {
            user.setName(request.getName());
        }

        // Update email if provided and changed
        if (request.getEmail() != null && !request.getEmail().isBlank()) {
            if (!request.getEmail().equals(user.getEmail())) {
                if (userRepository.existsByEmail(request.getEmail())) {
                    throw new RuntimeException("Email is already in use.");
                }
                user.setEmail(request.getEmail());
            }
        }

        // Update mobile number if provided and changed
        if (request.getMobileNumber() != null && !request.getMobileNumber().isBlank()) {
            if (!request.getMobileNumber().equals(user.getMobileNumber())) {
                if (userRepository.existsByMobileNumber(request.getMobileNumber())) {
                    throw new RuntimeException("Mobile number is already in use.");
                }
                user.setMobileNumber(request.getMobileNumber());
            }
        }

        User saved = userRepository.save(user);
        return mapToResponse(saved);
    }

    // ─── Helpers ───

    private User findUserByIdentifier(String identifier) {
        Optional<User> userOpt = userRepository.findByEmail(identifier);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByMobileNumber(identifier);
        }
        return userOpt.orElseThrow(() -> new RuntimeException("User not found."));
    }

    private UserProfileResponse mapToResponse(User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setMobileNumber(user.getMobileNumber());
        response.setMembershipLevel(user.getMembershipLevel());
        response.setLoyaltyPoints(user.getLoyaltyPoints());
        response.setWalletBalance(user.getWalletBalance());
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }
}
