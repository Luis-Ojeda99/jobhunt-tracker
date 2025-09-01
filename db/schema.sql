CREATE DATABASE jobhunt_tracker;

\c jobhunt_tracker;

CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'applied',
  date_applied DATE DEFAULT CURRENT_DATE,
  notes TEXT,
  interview_date DATE
);