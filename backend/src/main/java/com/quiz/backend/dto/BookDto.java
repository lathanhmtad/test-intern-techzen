package com.quiz.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookDto {
    private String formatBookId;
    private Long id;
    private String name;
    private String category;
    private Integer published;
    private AuthorDto author;
}
