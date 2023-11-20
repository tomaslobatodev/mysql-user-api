import {pool} from '../db.js'

export const getPing = async (req, res) => {
  const [result] = await pool.query('SELECT "Pong" AS Result')
  res.send(result[0])
}