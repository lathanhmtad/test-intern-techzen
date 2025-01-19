package com.quiz.backend.service.impl;

import com.quiz.backend.config.security.JwtTokenProvider;
import com.quiz.backend.dto.ParticipantDto;
import com.quiz.backend.entity.Participant;
import com.quiz.backend.form.LoginForm;
import com.quiz.backend.mapper.ParticipantMapper;
import com.quiz.backend.repository.ParticipantRepo;
import com.quiz.backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private ParticipantRepo participantRepo;
    private AuthenticationManager authenticationManager;
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public String authenticate(LoginForm loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        return jwtTokenProvider.generateJwtToken(authentication);
    }

    @Override
    public ParticipantDto getCurrentUser() {
        try {
            Long participantId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Participant me = participantRepo.findById(participantId).orElse(null);
            return ParticipantMapper.INSTANCE.toDto(me);
        } catch (Exception e) {
            return null;
        }
    }
}