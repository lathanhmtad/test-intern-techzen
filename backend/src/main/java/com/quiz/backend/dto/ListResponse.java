package com.quiz.backend.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@Setter
public class ListResponse<O> {
    private int pageNumber;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
    private List<O> content;

    public <E> ListResponse(List<O> content, Page<E> page) {
        this.content = content;
        this.pageNumber = page.getNumber() + 1;
        this.pageSize = page.getSize();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.last = page.isLast();
    }

    public <E> ListResponse(List<O> content) {
        this.content = content;
        this.pageNumber = 1;
        this.pageSize = 1;
        this.totalElements = 1;
        this.totalPages = 1;
        this.last = true;
    }

    public static <O, E> ListResponse of(List<O> content, Page<E> page) {
        return new ListResponse<>(content, page);
    }

    public static <O> ListResponse of(List<O> content) {
        return new ListResponse<>(content);
    }
}
