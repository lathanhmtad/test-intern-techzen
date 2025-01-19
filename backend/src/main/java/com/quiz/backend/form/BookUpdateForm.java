package com.quiz.backend.form;

import com.quiz.backend.dto.AuthorDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookUpdateForm {
    private Long id;
    private String name;
    private String category;
    private Integer published;
    private Long author_id;
}
