insert into roles ( name ) values ( 'ADMIN' );
insert into roles ( name ) values ( 'USER' );

insert into users (
   first_name,
   last_name,
   email,
   password_hash
) values ( 'Admin',
           'Adminovich',
           'admin@gmail.com',
           'Admin_777' );

insert into user_roles (
   user_id,
   role_id
)
   select u.id,
          r.id
     from users u,
          roles r
    where u.email = 'admin@gmail.com'
      and r.name = 'ADMIN';

commit;