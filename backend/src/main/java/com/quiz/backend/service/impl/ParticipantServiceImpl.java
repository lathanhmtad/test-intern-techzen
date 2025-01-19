package com.quiz.backend.service.impl;

import com.quiz.backend.dto.ListResponse;
import com.quiz.backend.dto.ParticipantDto;
import com.quiz.backend.entity.Participant;
import com.quiz.backend.mapper.ParticipantMapper;
import com.quiz.backend.repository.ParticipantRepo;
import com.quiz.backend.service.ParticipantService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ParticipantServiceImpl implements ParticipantService {

    private ParticipantRepo participantRepo;

    @Override
    public ListResponse<ParticipantDto> getParticipants(int pageNumber, int size) {
        PageRequest pageRequest = PageRequest.of(pageNumber, size);
        Page<Participant> page = participantRepo.findAll(pageRequest);
        List<ParticipantDto> participantDtos = ParticipantMapper.INSTANCE.toDto(page.getContent());
        return ListResponse.of(participantDtos, page);
    }
}
