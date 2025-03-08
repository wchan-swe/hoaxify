package com.hoaxify.hoaxify.validator;

import com.hoaxify.hoaxify.annotations.UniqueUsername;
import com.hoaxify.hoaxify.model.User;
import com.hoaxify.hoaxify.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public void initialize(UniqueUsername constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {

        User inDB = userRepository.findByUsername(s);
        if (inDB == null) {
            return true;
        }

        return false;
    }
}
