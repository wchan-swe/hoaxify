package com.hoaxify.hoaxify.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
public class SecurityConfiguration {

    @Autowired
    AuthUserService authUserService;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests(auth ->
                auth.requestMatchers(AntPathRequestMatcher.antMatcher(HttpMethod.POST, "/api/1.0/login")).authenticated()
                        .anyRequest().permitAll()
        );

        http.httpBasic(Customizer.withDefaults()); // Disable WWW-Authenticate header

        http.csrf(csrf -> csrf.disable());

        // ✅ Set custom AuthenticationEntryPoint
        http.exceptionHandling(exception ->
                exception.authenticationEntryPoint(new BasicAuthenticationEntryPoint()));


        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authUserService)
                .passwordEncoder(passwordEncoder());
    }
}
