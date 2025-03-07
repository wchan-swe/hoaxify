package com.hoaxify.hoaxify.controller;

import com.hoaxify.hoaxify.exception.ApiError;
import com.hoaxify.hoaxify.model.GenericResponse;
import com.hoaxify.hoaxify.model.User;
import com.hoaxify.hoaxify.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/1.0/users")
    GenericResponse createUser(@Valid @RequestBody User user) {
        userService.save(user);
        return new GenericResponse("User saved");
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ApiError handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        ApiError apiError = new ApiError(400, "Validation error", request.getServletPath());

        BindingResult bindingResult = ex.getBindingResult();

        Map<String, String> validationErrors = new HashMap<>();

        for(FieldError fieldError : bindingResult.getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        apiError.setValidationErrors(validationErrors);

        return apiError;
    }
}
