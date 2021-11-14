create table waste_donor(
    id serial primary key,
    firstname text,
    lastname text,
    cell_number text,
    residential_address text not null,
    email text,
    age integer,
    gender text,
    id_number BIGINT,
    user_password text,
    verification boolean
);