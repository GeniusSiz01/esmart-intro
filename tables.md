# eSmart-app schemar

create waste_collector(
    id integer primary key
    name text,
    surname text,
    phone_no text,
    vehicle_regNo text not null
);

create waste_donor(
    id integer primary key,
     name text,
    surname text,
    phone_no text,
    residential_address text not null
);

create waste_type (
    id integer primary key,
    name text
);

waste_bin(
    id integer primary key,
    donor_id integer not null,
    waste_type_id integer not null,
    weight text not null,
    filled_capacity text not null
);

create table depot_center(
    id integer primary key,
    name text,
    A1_general_Bin_capacity_filled text,
    B1_plastic_Bin_capacity_filled text,
    C1_metal_Bin_capacity_filled text,
    D1_glass_Bin_capacity_filled text
);

waste_bin_collection_activity(
    id integer primary key,
    waste_bin_id integer not null,
    waste_colector_id integer not null,
    waste_donor_id integer not null,
    depot_id integer not null,
    status_id text not null,
    weight_collected text not null,
    date_time text
);

waste_bin_collection_status(
    id integer primary key,
    name text,
    description text
);
db.exec('PRAGMA foreign_keys = ON;');