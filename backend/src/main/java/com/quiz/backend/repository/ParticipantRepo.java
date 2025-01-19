package com.quiz.backend.repository;

import com.quiz.backend.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ParticipantRepo extends JpaRepository<Participant, Long> {
    Optional<Participant> findByUsername(String email);
}