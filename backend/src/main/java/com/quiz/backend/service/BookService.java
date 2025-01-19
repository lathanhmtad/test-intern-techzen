package com.quiz.backend.service;

import com.quiz.backend.dto.BookDto;
import com.quiz.backend.dto.ListResponse;
import com.quiz.backend.form.BookUpdateForm;

public interface BookService {
    ListResponse<BookDto> getBooks(int pageNumber, int pageSize, String search);

    BookDto updateBook(BookUpdateForm bookUpdateForm);
}
