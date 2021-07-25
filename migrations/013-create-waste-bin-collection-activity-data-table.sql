-- create table waste_bin_collection_activity(
--     id integer primary key,
--     waste_bin_id integer not null,
--     waste_collector_id integer not null,
--     waste_donor_id integer not null,
--     depot_id integer not null,
--     status_id text not null,
--     weight_collected text not null,
--     date_time text,
--     foreign key (waste_bin_id) references waste_bin(id),
--     foreign key (waste_collector_id) references waste_collector(id),
--     foreign key (waste_donor_id) references waste_donor(id),
--     foreign key (depot_id) references depot(id),
--     foreign key (status_id) references status(id)
-- );

insert into waste_bin_collection_activity(waste_bin_id, waste_collector_id, waste_donor_id, depot_id, status_id, weight_collected, date_time) values(1, 1, 1, 1, 1, '19.5', "2021-06-15_13:15pm");
insert into waste_bin_collection_activity(waste_bin_id, waste_collector_id, waste_donor_id, depot_id, status_id, weight_collected, date_time) values(2, 2, 2, 2, 2, '19.7', "2021-06-22_15:30pm");
insert into waste_bin_collection_activity(waste_bin_id, waste_collector_id, waste_donor_id, depot_id, status_id, weight_collected, date_time) values(3, 3, 3, 3, 3, '19.1', "2021-06-22_9:30am");
insert into waste_bin_collection_activity(waste_bin_id, waste_collector_id, waste_donor_id, depot_id, status_id, weight_collected, date_time) values(4, 4, 4, 4, 4, '19.4', "2021-06-24_11:30am");
