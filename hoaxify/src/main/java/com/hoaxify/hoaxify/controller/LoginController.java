package com.hoaxify.hoaxify.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hoaxify.hoaxify.annotations.CurrentUser;
import com.hoaxify.hoaxify.model.User;
import com.hoaxify.hoaxify.model.Views;
import com.hoaxify.hoaxify.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
public class LoginController {

    @PostMapping("/api/1.0/login")
    @JsonView(Views.Base.class)
    User handleLogin(@CurrentUser User loggedInUser) {
        return loggedInUser;
    }
}
