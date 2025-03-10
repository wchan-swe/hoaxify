package com.hoaxify.hoaxify.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hoaxify.hoaxify.exception.ApiError;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class BasicAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON Mapper

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");

        // Construct ApiError
        ApiError apiError = new ApiError(
                HttpStatus.UNAUTHORIZED.value(),
                "Unauthorized",
                request.getRequestURI()
        );

        // Convert to JSON and write response
        response.getWriter().write(objectMapper.writeValueAsString(apiError));
    }
}
