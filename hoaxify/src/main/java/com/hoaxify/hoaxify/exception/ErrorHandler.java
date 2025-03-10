package com.hoaxify.hoaxify.exception;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import java.util.Map;
import java.util.Optional;

@RestController
public class ErrorHandler implements ErrorController {

    @Autowired
    private ErrorAttributes errorAttributes;

    @RequestMapping("/error")
    public ApiError handleError(WebRequest webRequest) {
        // Get error attributes with necessary fields
        Map<String, Object> errorAttributes = this.errorAttributes.getErrorAttributes(
                webRequest,
                ErrorAttributeOptions.of(
                        ErrorAttributeOptions.Include.MESSAGE,
                        ErrorAttributeOptions.Include.STATUS,
                        ErrorAttributeOptions.Include.BINDING_ERRORS
                )
        );

        // Extract status code and message safely
        int status = Optional.ofNullable((Integer) errorAttributes.get("status")).orElse(500);
        String message = Optional.ofNullable((String) errorAttributes.get("error")).orElse("Unknown Error");

        // Retrieve the original request path (not "/error")
        String path = Optional.ofNullable((String) webRequest.getAttribute("jakarta.servlet.error.request_uri", WebRequest.SCOPE_REQUEST))
                .orElse("/unknown");

        // Debugging: Print to check what path is being used
        System.out.println("Error Path: " + path);

        return new ApiError(status, message, path);
    }
}
