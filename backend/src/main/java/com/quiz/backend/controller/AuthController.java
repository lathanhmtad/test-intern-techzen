package com.quiz.backend.controller;

import com.quiz.backend.dto.ParticipantDto;
import com.quiz.backend.form.LoginForm;
import com.quiz.backend.service.AuthService;
import com.quiz.backend.util.CookieJwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Value("${jwt.jwtExpiration}")
    private String jwtExpiration;

    @GetMapping("/me")
    public ResponseEntity<ParticipantDto> getCurrentUser(HttpServletRequest request) {
        ParticipantDto me = authService.getCurrentUser();
        return ResponseEntity.ok(me);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody @Valid LoginForm loginRequest) {
        String accessToken = authService.authenticate(loginRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, CookieJwtUtil.setJwtCookie(accessToken, jwtExpiration))
                .body(Map.of("message", "sign in successful"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        ResponseCookie cookie = CookieJwtUtil.clearJwtCookie();
        return ResponseEntity.ok()
                .header("Set-Cookie", cookie.toString())
                .body(Map.of("message", "logout successful"));
    }
}