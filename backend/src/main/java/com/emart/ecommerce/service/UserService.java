package com.emart.ecommerce.service;

import com.emart.ecommerce.dto.UpdateProfileRequest;
import com.emart.ecommerce.dto.UserProfileResponse;

import java.util.List;
import java.util.Set;

public interface UserService {

    UserProfileResponse getProfile(String identifier);

    UserProfileResponse updateProfile(String identifier, UpdateProfileRequest request);

    List<UserProfileResponse> getAllUsers();

    UserProfileResponse updateUserRoles(Long userId, Set<String> roles);
}
