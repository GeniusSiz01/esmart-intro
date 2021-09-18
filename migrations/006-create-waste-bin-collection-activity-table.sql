create table waste_bin_collection_activity(
    id serial primary key,
    waste_bin_id integer not null,
    -- waste_collector_id integer,
    waste_donor_id integer not null,
    -- depot_id integer,
    -- waste_bin_collection_status_id integer not null,
    -- weight_collected real,
    date_time text,
    status text,
    foreign key (waste_bin_id) references waste_bin(id),
    -- foreign key (waste_collector_id) references waste_collector(id),
    foreign key (waste_donor_id) references waste_donor(id)
    -- foreign key (depot_id) references depot(id),
    -- foreign key (waste_bin_collection_status_id) references  waste_bin_collection_status(id)
);
