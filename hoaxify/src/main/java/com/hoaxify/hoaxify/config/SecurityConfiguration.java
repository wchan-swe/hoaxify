package com.hoaxify.hoaxify.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfiguration {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(auth ->
                auth.requestMatchers(AntPathRequestMatcher.antMatcher(HttpMethod.POST, "/api/1.0/login")).authenticated()
                        .anyRequest().permitAll()
        );

        http.httpBasic(httpBasic -> httpBasic.disable()); // Disable WWW-Authenticate header

        http.csrf(csrf -> csrf.disable());

        // ✅ Set custom AuthenticationEntryPoint
        http.exceptionHandling(exception ->
                exception.authenticationEntryPoint(new BasicAuthenticationEntryPoint())
        );

        return http.build();
    }
}
