# Job Finder

## Description

It's a simple crawler system which checks a pre-defined "Job offers" web page, then sends a SMS for my phone number when find some update post includind the terms I looking for. For this project, I decided to capture the [Themos Vagas](https://themosvagas.com.br) blog info, once I live on Teresina City (Piaui, Brazil).

The behavior of the project is also simple, and described on the following flow:
1) There is a crawler which reads the list of posts on the desired page, filtered by a specific search;
2) The program compares if that post already exists on the database, if not it saves the entry, just to avoid redundancies;
3) If it is a new post, the program generates a link on [Bitly](https://bitly.com) link shortener service;
4) After it got a shortened link, it just sends a SMS for a personal phone number, using the [Amazon Web Services](https://aws.amazon.com), notifying about the new job offer.

## Installation

This is a simple Node.js project, and you just have to `npm install` it, and then `node index.js`.

## Notes

- You must to replace **configs.template.json** file to **configs.json**, then add your real informations.