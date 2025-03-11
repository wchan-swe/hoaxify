package com.hoaxify.hoaxify.controller;

import com.hoaxify.hoaxify.annotations.CurrentUser;
import com.hoaxify.hoaxify.model.User;
import com.hoaxify.hoaxify.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/1.0/login")
    public Map<String, Object> handleLogin(@CurrentUser UserDetails userDetails) {
        if (userDetails == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        // Fetch actual User from database using username
        Optional<User> userOptional = userRepository.findByUsername(userDetails.getUsername());
        User loggedInUser = userOptional.orElseThrow(() ->
                new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        return Collections.singletonMap("id", loggedInUser.getId());
    }
}
