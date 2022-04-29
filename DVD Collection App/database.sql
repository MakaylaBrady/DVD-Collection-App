CREATE DATABASE dvdcollection;

CREATE TABLE dvd(
    title VARCHAR(255) PRIMARY KEY NOT NULL,
    category VARCHAR(255) NOT NULL,
    runtime VARCHAR(255) NOT NULL,
    yearrelease VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL
);
