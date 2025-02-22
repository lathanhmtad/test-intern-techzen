DROP DATABASE IF EXISTS book_test;

CREATE DATABASE book_test;

USE book_test;

CREATE TABLE book
(
	id 						bigint auto_increment 	not null,
	name 					varchar(255) 			not null,
	category 					varchar(255) 			not null,
	published 					int 			not null,
	author_id	 				varchar(255)		 	not null,
    constraint pk_participant primary key (id)
);

CREATE TABLE author
(
	id 						bigint auto_increment 	not null,
	name 					varchar(255) 			not null,
    constraint pk_participant primary key (id)
);

INSERT INTO author(name)
VALUES
	("Keigo Higashino"),
    ("Nguyễn Phong"),
    ("J.K. Rowling"),
    ("Nguyễn Nhật Ánh"),
    ("Haruki Murakami")
;

INSERT INTO book(name, category, published, author_id)
VALUES
	('Điều kỳ diệu của tiệm tạp hóa Namiya', 'Văn học', 2017, 1),
	('Hành trình về phương Đông', 'Khoa học', 2018, 2),
	('Harry Potter và Hòn đá Phù thủy', 'Tiểu thuyết', 1997, 3),
	('Tôi thấy hoa vàng trên cỏ xanh', 'Văn học', 2010, 4),
	('Rừng Na Uy', 'Tiểu thuyết', 1987, 5)
