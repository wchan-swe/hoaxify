package com.hoaxify.hoaxify.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hoaxify.hoaxify.exception.ApiError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration
public class SecurityConfiguration {

    @Autowired
    AuthUserService authUserService;

    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON Mapper

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(auth ->
                auth.requestMatchers(AntPathRequestMatcher.antMatcher(HttpMethod.POST, "/api/1.0/login")).authenticated()
                        .anyRequest().permitAll()
        );

        // Keep Basic Authentication but override the entry point
        http.httpBasic(httpBasic ->
                httpBasic.authenticationEntryPoint((request, response, authException) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");

                    // Construct API Error JSON
                    ApiError apiError = new ApiError(
                            HttpStatus.UNAUTHORIZED.value(),
                            "Unauthorized",
                            request.getRequestURI()
                    );

                    response.getWriter().write(objectMapper.writeValueAsString(apiError));
                })
        );

        http.csrf(csrf -> csrf.disable());

        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Register the RemoveWWWAuthenticateFilter
        http.addFilterAfter(new RemoveWWWAuthenticateFilter(), BasicAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}