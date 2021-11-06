create table notifications(
    id integer primary key,
    name text,
    description text waste_donor_id INTEGER REFERENCES waste_donor (id) ON DELETE CASCADE ON UPDATE CASCADE,
    waste_collector_id INTEGER REFERENCES waste_collector (id) ON DELETE CASCADE ON UPDATE CASCADE,
    waste_type_id INTEGER REFERENCES waste_type (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- insert into waste_bin_collection_status(name, description) values('in-request', 'request sent for collection by waste donor');
-- insert into waste_bin_collection_status(name, description) values('scheduled', 'threshhold filled capacity reached, collection request can be initiated');
-- insert into waste_bin_collection_status(name, description) values('collected', 'waste collected from donor');
-- insert into waste_bin_collection_status(name, description) values('depoted', 'waste depoted by collector at depot');
-- insert into waste_bin_collection_status(name, description) values('dispatched', 'waste dispatched by depot to client');
-- insert into waste_bin_collection_status(name, description) values('in-use', 'waste bin filled capacity between 0-80%');