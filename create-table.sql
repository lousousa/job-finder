create table themosvagas (
    id int auto_increment,
    post_id int,
    post_url varchar(255),
    post_date date,
    primary key (id)
) engine=innodb;
