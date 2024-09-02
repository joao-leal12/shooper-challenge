CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS recorded_measurements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  measure_uuid TEXT UNIQUE NOT NULL, 
  measure_datetime TEXT NOT NULL,
  measure_type TEXT NOT NULL,
  has_confirmed INTEGER DEFAULT 0, 
  image_uri TEXT, 
  customers_uuid TEXT NOT NULL,
  measure_value REAL NOT NULL,
  FOREIGN KEY (customers_uuid) REFERENCES customers(id)
);