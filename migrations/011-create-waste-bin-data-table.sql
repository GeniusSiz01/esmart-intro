-- create table waste_bin(
--     id integer primary key,
--     waste_donor_id integer not null,
--     waste_type_id integer not null,
--     weight text not null,
--     filled_capacity text not null,
--     foreign key (waste_donor_id) references waste_donor(id),
--     foreign key (waste_type_id) references waste_type(id)
-- );
insert into waste_bin(waste_donor_id, waste_type_id, weight, filled_capacity) values(1, 1, '19.8', '99%');
insert into waste_bin(waste_donor_id, waste_type_id, weight, filled_capacity) values(2, 2, '18.9', '95%');
insert into waste_bin(waste_donor_id, waste_type_id, weight, filled_capacity) values(3, 3, '19.5', '98%');
insert into waste_bin(waste_donor_id, waste_type_id, weight, filled_capacity) values(4, 4, '19.3', '97%');
