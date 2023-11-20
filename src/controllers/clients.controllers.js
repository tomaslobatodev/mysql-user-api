import { pool } from '../db.js'

export const getClient = async (req, res) => {
  const { id } = req.params

  try {
    const [rows] = await pool.query('SELECT * FROM client WHERE id = ?', [
      parseInt(id),
    ])
    if (rows.length === 0) {
      res.status(404).json({ error: 'client not found' })
      return
    }
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}

export const getClients = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM client')
    res.send(rows)
  } catch (err) {
    res.status(500).json({ error: 'something went wrong' })
  }
}

export const createClient = async (req, res) => {
  const { name, work } = req.body
  if (!name || !work) return res.status(400).json({ error: 'fields missing' })
  
  try {
    await pool.query('INSERT INTO client (name, work) VALUES (?, ?)', [
      name,
      work,
    ])
    res.json({ success: 'client created successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}

export const updateClient = async (req, res) => {
  const { id } = req.params
  const { name, work } = req.body

  if (!id) {
    return res.status(400).json({ error: 'id not specified' })
  }

  if (!name && !work)
    return res.json({ error: 'enter at least a value to modify' })

  try {
    const [rows] = await pool.query('SELECT * FROM client WHERE id = ?', [
      parseInt(id),
    ])

    if (rows.length === 0) {
      return res.status(404).json({ error: 'client not found' })
    }

    await pool.query(
      'UPDATE client SET name = IFNULL(?, name), work = IFNULL(?, work) WHERE id = ?',
      [name, work, id]
    )
    res.json({ success: 'Updated successfully' })
  } catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}

export const deleteClient = async (req, res) => {
  const { id } = req.params
  if (!id) return res.json({ error: 'id not specified' })

  try {
    const { affectedRows } = await pool.query(
      'DELETE FROM client WHERE id = ?',
      [parseInt(id)]
    )
    if (affectedRows === 0) {
      return res.json({ error: 'client not found' })
    }

    await pool.query('DELETE FROM client WHERE id = ?', [parseInt(id)])

    res.json({ success: 'Deleted successfully' })
  } catch (err) {
    return res.status(500).json({ error: 'something went wrong' })
  }
}
