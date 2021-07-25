create table waste_bin(
    id integer primary key,
    waste_donor_id integer not null,
    waste_type_id integer not null,
    weight text not null,
    filled_capacity text not null,
    foreign key (waste_donor_id) references waste_donor(id),
    foreign key (waste_type_id) references waste_type(id)
);
