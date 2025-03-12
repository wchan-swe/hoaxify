package com.hoaxify.hoaxify.controller;

import com.hoaxify.hoaxify.annotations.CurrentUser;
import com.hoaxify.hoaxify.model.User;
import com.hoaxify.hoaxify.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class LoginController {

    private final UserRepository userRepository;

    public LoginController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/api/1.0/login")
    public Map<String, Object> handleLogin(@CurrentUser User loggedInUser) {
        if (loggedInUser == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
        }

        // Fetch actual user from DB (ensure we get full user details)
        Optional<User> userOptional = userRepository.findByUsername(loggedInUser.getUsername());
        User user = userOptional.orElseThrow(() ->
                new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        // ✅ Construct a structured response including `image`
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());
        response.put("displayName", user.getDisplayName());
        response.put("image", user.getImage()); // Ensure image is directly stored in response

        return response;
    }
}
