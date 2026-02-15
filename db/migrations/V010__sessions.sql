create table sessions (
   token      varchar2(64) primary key,
   user_id    number not null,
   created_at date default sysdate,
   expires_at date not null,
   constraint fk_sessions_user foreign key ( user_id )
      references users ( id )
);

create index idx_sessions_user on
   sessions (
      user_id
   );