package com.quiz.backend.exception;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@Setter
public class ErrorResponse {
    private String timestamp;
    private String message;
    private Map<String, String> details;

    public ErrorResponse(String message, Map<String, String> details) {
        this.timestamp = LocalDateTime.now().toString();
        this.message = message;
        this.details = details;
    }
}
