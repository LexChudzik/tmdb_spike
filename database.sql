CREATE DATABASE 'tmdb_test';

CREATE TABLE "movie" (
	"id" serial primary key,
	"title" varchar (80) NOT NULL,
	"tmdb_id" varchar (10) NOT NULL,
	"poster_path" varchar (200),
	"tag" varchar (10)
);