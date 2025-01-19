package com.quiz.backend.service;

import com.quiz.backend.dto.ListResponse;
import com.quiz.backend.dto.ParticipantDto;

public interface ParticipantService {
    ListResponse<ParticipantDto> getParticipants(int pageNumber, int pageSize);
}
