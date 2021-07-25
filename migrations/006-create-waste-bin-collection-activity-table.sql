create table waste_bin_collection_activity(
    id integer primary key,
    waste_bin_id integer not null,
    waste_collector_id integer not null,
    waste_donor_id integer not null,
    depot_id integer not null,
    status_id text not null,
    weight_collected text not null,
    date_time text,
    foreign key (waste_bin_id) references waste_bin(id),
    foreign key (waste_collector_id) references waste_collector(id),
    foreign key (waste_donor_id) references waste_donor(id),
    foreign key (depot_id) references depot(id),
    foreign key (status_id) references status(id)
);