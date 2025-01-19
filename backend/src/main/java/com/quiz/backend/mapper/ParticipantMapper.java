package com.quiz.backend.mapper;

import com.quiz.backend.dto.ParticipantDto;
import com.quiz.backend.entity.Participant;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ParticipantMapper {
    ParticipantMapper INSTANCE = Mappers.getMapper(ParticipantMapper.class);

    ParticipantDto toDto(Participant participant);

    List<ParticipantDto> toDto(List<Participant> participants);
}
