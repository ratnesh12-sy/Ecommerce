package com.emart.ecommerce.security;

import com.emart.ecommerce.entity.User;
import com.emart.ecommerce.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        // Super Admin bypass for dev access
        if ("admin@emart.com".equals(identifier)) {
            return new org.springframework.security.core.userdetails.User(
                    identifier,
                    "N/A", // Password not checked since we bypassed login
                    Set.of(new SimpleGrantedAuthority("ROLE_USER"), new SimpleGrantedAuthority("ROLE_ADMIN")));
        }

        // Try email first (for email+password users), then phone (for OTP users)
        Optional<User> userOpt = userRepository.findByEmail(identifier);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByMobileNumber(identifier);
        }

        User user = userOpt.orElseThrow(() -> new UsernameNotFoundException("User not found: " + identifier));

        Set<GrantedAuthority> authorities = user.getRoles().stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toSet());

        // For phone-only users, password is null — use "N/A" placeholder
        String password = user.getPassword() != null ? user.getPassword() : "N/A";

        return new org.springframework.security.core.userdetails.User(
                identifier,
                password,
                authorities);
    }
}
