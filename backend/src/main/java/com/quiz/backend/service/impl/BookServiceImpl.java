package com.quiz.backend.service.impl;

import com.quiz.backend.dto.AuthorDto;
import com.quiz.backend.dto.BookDto;
import com.quiz.backend.dto.ListResponse;
import com.quiz.backend.entity.Author;
import com.quiz.backend.entity.Book;
import com.quiz.backend.form.BookUpdateForm;
import com.quiz.backend.mapper.BookMapper;
import com.quiz.backend.repository.BookRepo;
import com.quiz.backend.service.BookService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookServiceImpl implements BookService {
    private BookRepo bookRepo;

    @Override
    public ListResponse<BookDto> getBooks(int pageNumber, int pageSize, String search) {
        double a = 5F;
        PageRequest pageRequest = PageRequest.of(pageNumber - 1, pageSize);
        List<Book> books = null;
        if(search != null && !search.isEmpty()) {
            books = bookRepo.findByNameLike(String.format("%%%s%%", search));
        }
        else {
            books = bookRepo.findAll();
        }
//        Page<Book> page = bookRepo.findAll(pageRequest);
        List<BookDto> bookDtos = books.stream().map(item -> {
            BookDto bookDto = new BookDto();
            bookDto.setFormatBookId(String.format("BK-%04d", item.getId()));
            bookDto.setId(item.getId());
            bookDto.setName(item.getName());
            bookDto.setCategory(item.getCategory());
            bookDto.setPublished(item.getPublished());

            AuthorDto authorDto = new AuthorDto();
            authorDto.setId(item.getAuthor().getId());
            authorDto.setName(item.getAuthor().getName());
            bookDto.setAuthor(authorDto);
            return bookDto;
        }).collect(Collectors.toList());

//        List<BookDto> bookDtos = BookMapper.INSTANCE.toDto(page.getContent());
//        return ListResponse.of(bookDtos, page);
        return ListResponse.of(bookDtos);
    }

    @Override
    public BookDto updateBook(BookUpdateForm bookUpdateForm) {
        Book book = bookRepo.findById(bookUpdateForm.getId()).get();

        book.setName(bookUpdateForm.getName());
        book.setCategory(bookUpdateForm.getCategory());
        book.setPublished(bookUpdateForm.getPublished());
        if(book.getAuthor().getId() != bookUpdateForm.getAuthor_id()) {
            Author newAuthor = new Author();
            newAuthor.setId(bookUpdateForm.getAuthor_id());
            book.setAuthor(newAuthor);
        }

        BookDto bookDto = BookMapper.INSTANCE.toDto(bookRepo.save(book));
        return bookDto;
    }
}
