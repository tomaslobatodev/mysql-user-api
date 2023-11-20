CREATE DATABASE IF NOT EXISTS companydb;

USE companydb

CREATE TABLE user (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(40) DEFAULT NULL,
  work VARCHAR(40) DEFAULT NULL,
  PRIMARY KEY(id)
)

DESCRIBE user

INSERT INTO user VALUES
  (1, 'Tomas', 'Programmer'),
  (2, 'Sherlock', 'Consulting detective');