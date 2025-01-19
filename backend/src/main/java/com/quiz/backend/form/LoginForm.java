package com.quiz.backend.form;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class LoginForm {
    @NotBlank(message = "username is required")
    @Length(max = 50, message = "maximum 50 characters")
    private String username;

    @NotBlank(message = "password must contain letters or numbers")
    @Length(min = 3, max = 50, message = "at least 3 characters a maximum of 50 characters")
    private String password;
}