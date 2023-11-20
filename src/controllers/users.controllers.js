import { pool } from '../db'

export const getUser = async (req, res) => {
  const { id } = req.params

  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [
      parseInt(id),
    ])
    if (rows.length === 0) {
      res.status(404).json({ error: 'user not found' })
      return
    }
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM user')
    res.send(rows)
  } catch (err) {
    res.status(500).json({ error: 'something went wrong' })
  }
}

export const createUser = async (req, res) => {
  const { name, work } = req.body
  if (!name || !work) return res.status(400).json({ error: 'fields missing' })
  try {
    const [rows] = await pool.query(
      'INSERT INTO user (name, work) VALUES (?, ?)',
      [name, work]
    )
    res.json({success: "user created successfully"})
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, work } = req.body

  if (!name && !work) return res.json({ error: 'enter at least a value to modify' })

  try {
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
  } catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  if (!id) return res.json({ error: 'id not specified' })

  try {
    const [rows] = await pool.query('SELECT * FROM user WHERE id = ?', [
      parseInt(id),
    ])

    if (rows.length === 0) {
      res.json({ error: 'user not found' })
      return
    }

    await pool.query('DELETE FROM user WHERE id = ?', [parseInt(id)])

    res.json({ success: 'Deleted successfully' })
  } catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}
