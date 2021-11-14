create table waste_bin(
    id serial primary key,
    weight real,
    filled_capacity integer,
    status boolean,
    schedule text,
    timestamp text,
    waste_donor_id INTEGER REFERENCES waste_donor (id) ON DELETE CASCADE ON UPDATE CASCADE,
    waste_type_id INTEGER REFERENCES waste_type (id) ON DELETE CASCADE ON UPDATE CASCADE
);