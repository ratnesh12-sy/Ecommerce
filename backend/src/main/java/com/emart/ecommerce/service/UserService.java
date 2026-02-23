package com.emart.ecommerce.service;

import com.emart.ecommerce.dto.UpdateProfileRequest;
import com.emart.ecommerce.dto.UserProfileResponse;

public interface UserService {

    UserProfileResponse getProfile(String identifier);

    UserProfileResponse updateProfile(String identifier, UpdateProfileRequest request);
}
