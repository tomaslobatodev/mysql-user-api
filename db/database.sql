CREATE DATABASE IF NOT EXISTS companydb;

USE companydb

CREATE TABLE client (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(40) DEFAULT NULL,
  work VARCHAR(40) DEFAULT NULL,
  PRIMARY KEY(id)
)

INSERT INTO client VALUES
  (1, 'Tomas', 'Programmer'),
  (2, 'Sherlock', 'Consulting detective'),
  (3, 'Saul', 'Lawyer'),
  (4, 'Rick', 'Scientist');