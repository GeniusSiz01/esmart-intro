create table waste_collector(
    id  serial primary key,
    first_name text,
    last_name text,
    cell_number text,
    vehicle_regNo text not null,
    email text,
    location text,
    age integer,
    gender text,
    id_number BIGINT,
    user_password text,
    verification boolean
);