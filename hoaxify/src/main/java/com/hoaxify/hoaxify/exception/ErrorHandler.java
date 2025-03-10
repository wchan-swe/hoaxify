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
        // Retrieve error attributes and include status and message explicitly
        Map<String, Object> errorAttributes = this.errorAttributes.getErrorAttributes(
                webRequest,
                ErrorAttributeOptions.of(
                        ErrorAttributeOptions.Include.MESSAGE,
                        ErrorAttributeOptions.Include.STATUS
                )
        );

        // Debugging: Print error attributes to verify what is available
        System.out.println("Error attributes: " + errorAttributes);

        // Ensure "status" is not null, otherwise default to 500
        int status = Optional.ofNullable((Integer) errorAttributes.get("status")).orElse(500);
        String error = Optional.ofNullable((String) errorAttributes.get("error")).orElse("Unknown Error");
        String path = Optional.ofNullable((String) errorAttributes.get("path")).orElse("N/A");

        return new ApiError(status, error, path);
    }
}
