package com.quiz.backend.controller;

import com.quiz.backend.constant.AppConstants;
import com.quiz.backend.dto.ListResponse;
import com.quiz.backend.dto.ParticipantDto;
import com.quiz.backend.service.ParticipantService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/participants")
@AllArgsConstructor
public class ParticipantController {

    private ParticipantService participantService;

    @GetMapping
    public ResponseEntity<ListResponse<ParticipantDto>> getParticipants(
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize
    ) {
        ListResponse<ParticipantDto> listResponse = participantService.getParticipants(pageNumber, pageSize);
        return ResponseEntity.ok(listResponse);
    }
}
