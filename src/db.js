import {createPool} from 'mysql2/promise'
import {DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE, DB_HOST} from './config.js'

export const pool = createPool({
  host: 'localhost', //DB_HOST,
  user: 'root', //DB_USER,
  password: 'boogeraids', // DB_PASSWORD,
  port: 3306, //DB_PORT,
  database: 'companydb' //DB_DATABASE
})