package com.quiz.backend.controller;

import com.quiz.backend.constant.AppConstants;
import com.quiz.backend.dto.BookDto;
import com.quiz.backend.dto.ListResponse;
import com.quiz.backend.form.BookUpdateForm;
import com.quiz.backend.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
@AllArgsConstructor
public class BookController {

    private BookService bookService;

    @GetMapping
    public ResponseEntity<ListResponse<BookDto>> getBooks(
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int pageNumber,
            @RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int pageSize,
            @RequestParam(name = "search", required = false) @Nullable String search,
            @RequestParam(name = "author_id", required = false) @Nullable Long author_id,
            @RequestParam(name = "category", required = false) @Nullable String categoryName
    ) {
        ListResponse<BookDto> listResponse = bookService.getBooks(pageNumber, pageSize, search);
        if(author_id != null && categoryName != null && !categoryName.isBlank()) {
            List<BookDto> newContent = listResponse.getContent().stream().filter(item -> item.getAuthor().getId() == author_id && item.getCategory().equalsIgnoreCase(categoryName)).toList();
            listResponse.setContent(newContent);
            return ResponseEntity.ok(listResponse);
        }
        if (author_id != null) {
            List<BookDto> newContent = listResponse.getContent().stream().filter(item -> item.getAuthor().getId() == author_id).toList();
            listResponse.setContent(newContent);
            return ResponseEntity.ok(listResponse);
        }
        if(categoryName != null && !categoryName.isBlank()) {
            List<BookDto> newContent = listResponse.getContent().stream().filter(item -> item.getCategory().equalsIgnoreCase(categoryName)).toList();
            listResponse.setContent(newContent);
            return ResponseEntity.ok(listResponse);
        }
        return ResponseEntity.ok(listResponse);
    }

    @PostMapping
    public ResponseEntity<?> updateBook(@RequestBody BookUpdateForm bookUpdateForm) {
        BookDto bookDto = bookService.updateBook(bookUpdateForm);
        return ResponseEntity.ok(
                Map.of("message", "Cập nhập sách thành công")
        );
    }
}
