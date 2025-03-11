package com.hoaxify.hoaxify.controller;

import com.hoaxify.hoaxify.model.User;
import com.hoaxify.hoaxify.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/1.0/login")
    public ResponseEntity<User> handleLogin() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails userDetails) {
            Optional<User> userOptional = userRepository.findByUsername(userDetails.getUsername());

            if (userOptional.isPresent()) {
                return ResponseEntity.ok(userOptional.get()); // ✅ Returns actual User
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // ❌ User not found
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
}
