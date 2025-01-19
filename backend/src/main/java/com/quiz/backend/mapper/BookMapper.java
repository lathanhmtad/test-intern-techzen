package com.quiz.backend.mapper;

import com.quiz.backend.dto.BookDto;
import com.quiz.backend.entity.Book;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookMapper {
    BookMapper INSTANCE = Mappers.getMapper(BookMapper.class);

    BookDto toDto(Book book);

    List<BookDto> toDto(List<Book> books);
}
