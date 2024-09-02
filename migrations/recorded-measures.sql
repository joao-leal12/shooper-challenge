CREATE TABLE recorded_measurements ( 
   measure_uuid text PRIMARY KEY UNIQUE, 
   measure_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   measure_type_id INTEGER,
   has_confirmed INTEGER DEFAULT 0, 
   image_uri varchar(100),
   FOREIGN KEY (measure_type_id) REFERENCES measure_type(id) 
)