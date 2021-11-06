create table waste_bin_collection_activity(
    id serial primary key,
    -- depot_id integer,
    -- waste_bin_collection_status_id integer not null,
    -- weight_collected real,
    date_time text,
    status boolean,
    -- waste_bin_id INTEGER REFERENCES waste_bin (id) ON DELETE CASCADE ON UPDATE CASCADE,
    waste_donor_id INTEGER REFERENCES waste_donor (id) ON DELETE CASCADE ON UPDATE CASCADE,
    waste_collector_id INTEGER REFERENCES waste_collector (id) ON DELETE CASCADE ON UPDATE CASCADE,
    waste_type_id INTEGER REFERENCES waste_type (id) ON DELETE CASCADE ON UPDATE CASCADE
);