package com.quiz.backend.dto;

import com.quiz.backend.entity.RoleType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParticipantDto {
    private Long id;
    private String username;
    private String email;
    private String name;
    private String avatar;
    private Boolean enabled;
    private RoleType role;
    private String createdAt;
    private String updatedAt;
}
