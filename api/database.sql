CREATE table scores
(
    id           int auto_increment,
    playerName   varchar(50) not null,
    gameDuration int         not null,
    constraint score_pk
        primary key (id)
);

