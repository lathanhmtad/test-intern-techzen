package com.quiz.backend.service;

import com.quiz.backend.dto.ParticipantDto;
import com.quiz.backend.form.LoginForm;

public interface AuthService {
    String authenticate(LoginForm loginForm);

    ParticipantDto getCurrentUser();
}
