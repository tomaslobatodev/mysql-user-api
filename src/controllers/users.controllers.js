import { pool } from '../db'

export const getUser = async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [
    parseInt(id),
  ])

  if (rows.length === 0) {
    res.json({ error: 'user not found' })
    return
  }

  res.json(rows[0])
}

export const getUsers = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM user')
  res.send({ rows })
}

export const createUser = async (req, res) => {
  const { name, work } = req.body
  if (!name || !work) {
    res.json({ error: 'fields missing' })
    return
  }
  const [rows] = await pool.query(
    'INSERT INTO user (name, work) VALUES (?, ?)',
    [name, work]
  )
  res.send({ rows })
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, work } = req.body
  const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [
    parseInt(id),
  ])

  if (rows.length === 0) {
    res.json({ error: 'user not found' })
    return
  }

  await pool.query(
    'UPDATE user SET   name = IFNULL(?, name), work = IFNULL(?, work) WHERE id = ?',
    [name, work, id]
  )
  res.send('Updated Successfully')
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  if (!id) {
    res.json({ error: 'id not specified' })
    return
  }

  const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [
    parseInt(id),
  ])

  if (rows.length === 0) {
    res.json({ error: 'user not found' })
    return
  }

  await pool.query('DELETE FROM user WHERE id = ?', [parseInt(id)])

  res.json({ success: 'Deleted successfully' })
}
